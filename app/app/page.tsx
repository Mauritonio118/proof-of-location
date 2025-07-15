"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Wallet, ArrowLeft, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

declare global {
  interface Window {
    ethereum?: any
  }
}

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

// Contract configuration
const CONTRACT_ADDRESS = "0x416ae615F8B1607368D9C00376b75091B6511d0B"
const CHAIN_ID = 710
const CHAIN_CONFIG = {
  chainId: `0x${CHAIN_ID.toString(16)}`, // Convert to hex
  chainName: "UZH_ETH_PoS",
  rpcUrls: ["http://rpc-uzheths.blockchain-group.ch:8546"],
  nativeCurrency: {
    name: "UZHETH",
    symbol: "UZHETH",
    decimals: 18,
  },
}

const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "entries",
    outputs: [
      { internalType: "string", name: "latitude", type: "string" },
      { internalType: "string", name: "longitude", type: "string" },
      { internalType: "string", name: "accuracy", type: "string" },
      { internalType: "string", name: "timestamp", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_latitude", type: "string" },
      { internalType: "string", name: "_longitude", type: "string" },
      { internalType: "string", name: "_accuracy", type: "string" },
      { internalType: "string", name: "_timestamp", type: "string" },
    ],
    name: "logLocation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "getEntry",
    outputs: [
      { internalType: "string", name: "latitude", type: "string" },
      { internalType: "string", name: "longitude", type: "string" },
      { internalType: "string", name: "accuracy", type: "string" },
      { internalType: "string", name: "timestamp", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalEntries",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]

export default function AppPage() {
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [location, setLocation] = useState<LocationData | null>(null)
  const [locationError, setLocationError] = useState<string>("")
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [isProofing, setIsProofing] = useState(false)
  const [proofStatus, setProofStatus] = useState<{
    type: "success" | "error" | null
    message: string
    txHash?: string
  }>({ type: null, message: "" })
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)

  const checkNetwork = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const chainId = await window.ethereum.request({ method: "eth_chainId" })
        const currentChainId = Number.parseInt(chainId, 16)
        setIsCorrectNetwork(currentChainId === CHAIN_ID)
        return currentChainId === CHAIN_ID
      } catch (error) {
        console.error("Error checking network:", error)
        return false
      }
    }
    return false
  }

  const switchNetwork = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CHAIN_CONFIG.chainId }],
        })
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [CHAIN_CONFIG],
            })
          } catch (addError) {
            console.error("Error adding network:", addError)
            throw addError
          }
        } else {
          throw switchError
        }
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      setIsConnecting(true)
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setWalletAddress(accounts[0])
        await checkNetwork()
      } catch (error) {
        console.error("Error connecting wallet:", error)
      } finally {
        setIsConnecting(false)
      }
    } else {
      alert("Please install MetaMask or another Ethereum wallet")
    }
  }

  const disconnectWallet = () => {
    setWalletAddress("")
    setIsCorrectNetwork(false)
  }

  const getLocation = () => {
    setIsLoadingLocation(true)
    setLocationError("")

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.")
      setIsLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        })
        setIsLoadingLocation(false)
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location."
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable."
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out."
            break
        }
        setLocationError(errorMessage)
        setIsLoadingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // --- Proof-of-location transaction ---------------------------------
  const proofLocation = async () => {
    if (!location || !walletAddress) {
      setProofStatus({
        type: "error",
        message: "Please connect your wallet and get your location first.",
      })
      return
    }

    // 1️⃣ Ensure we’re on the correct network
    const onCorrectNet = await checkNetwork()
    if (!onCorrectNet) {
      try {
        await switchNetwork()
        if (!(await checkNetwork())) {
          setProofStatus({
            type: "error",
            message: "Please switch to the UZH_ETH_PoS network to continue.",
          })
          return
        }
      } catch (err) {
        setProofStatus({
          type: "error",
          message: "Failed to switch network. Please switch manually.",
        })
        return
      }
    }

    setIsProofing(true)
    setProofStatus({ type: null, message: "" })

    try {
      // 2️⃣ Set up ethers provider / signer
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      // 3️⃣ Instantiate contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      // 4️⃣ Prepare data (strings)
      const latitudeStr = location.latitude.toString()
      const longitudeStr = location.longitude.toString()
      const accuracyStr = location.accuracy.toString()
      const timestampStr = location.timestamp.toString()

      // 5️⃣ Send transaction
      const tx = await contract.logLocation(latitudeStr, longitudeStr, accuracyStr, timestampStr)

      setProofStatus({
        type: "success",
        message: "Transaction sent! Waiting for confirmation…",
        txHash: tx.hash,
      })

      await tx.wait()

      setProofStatus({
        type: "success",
        message: "Location proof confirmed on-chain ✔",
        txHash: tx.hash,
      })
    } catch (error: any) {
      console.error("Error submitting proof:", error)
      const msg =
        error.code === 4001 ? "Transaction was rejected by user." : error.message || "Failed to submit location proof."
      setProofStatus({ type: "error", message: msg })
    } finally {
      setIsProofing(false)
    }
  }

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          })
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
            await checkNetwork()
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
        }
      }
    }
    checkConnection()
  }, [])

  useEffect(() => {
    // Automatically get location when page loads
    getLocation()
  }, [])

  useEffect(() => {
    // Listen for network changes
    if (typeof window.ethereum !== "undefined") {
      const handleChainChanged = () => {
        checkNetwork()
      }

      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </Link>
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold text-white">Proof of Location</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!isCorrectNetwork && walletAddress && (
              <Button
                onClick={switchNetwork}
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent"
              >
                Switch Network
              </Button>
            )}
            {walletAddress ? (
              <Button
                onClick={disconnectWallet}
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
              >
                <Wallet className="w-4 h-4 mr-2" />
                {formatAddress(walletAddress)}
              </Button>
            ) : (
              <Button
                onClick={connectWallet}
                disabled={isConnecting}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Wallet className="w-4 h-4 mr-2" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Generate Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Location Proof
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Verify your current location and generate cryptographic proof on the blockchain
            </p>
          </div>

          {/* Status Messages */}
          {proofStatus.type && (
            <Card
              className={`mb-6 ${proofStatus.type === "success" ? "bg-green-900/20 border-green-400/30" : "bg-red-900/20 border-red-400/30"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  {proofStatus.type === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  )}
                  <span className={proofStatus.type === "success" ? "text-green-300" : "text-red-300"}>
                    {proofStatus.message}
                  </span>
                </div>
                {proofStatus.txHash && (
                  <div className="mt-3 space-y-2">
                    <p className="text-green-400 text-sm font-mono">Transaction: {proofStatus.txHash}</p>
                    <a
                      href={`http://130.60.24.234:4000/tx/${proofStatus.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-green-600/20 hover:bg-green-600/30 border border-green-400/30 hover:border-green-400/50 rounded-lg px-4 py-2 text-green-300 hover:text-green-200 transition-all duration-200 text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <span>Verificar en Block Explorer</span>
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Location Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MapPin className="h-6 w-6 text-purple-400 mr-2" />
                Your Current Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingLocation ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 text-purple-400 animate-spin mr-3" />
                  <span className="text-gray-300">Getting your location...</span>
                </div>
              ) : locationError ? (
                <div className="text-center py-8">
                  <p className="text-red-400 mb-4">{locationError}</p>
                  <Button
                    onClick={getLocation}
                    variant="outline"
                    className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
                  >
                    Try Again
                  </Button>
                </div>
              ) : location ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Latitude</p>
                      <p className="text-white font-mono text-lg">{location.latitude.toFixed(6)}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Longitude</p>
                      <p className="text-white font-mono text-lg">{location.longitude.toFixed(6)}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Accuracy</p>
                      <p className="text-white">{Math.round(location.accuracy)} meters</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Timestamp</p>
                      <p className="text-white">{new Date(location.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-300 mb-4">Location not available</p>
                  <Button onClick={getLocation} className="bg-purple-600 hover:bg-purple-700 text-white">
                    Get Location
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Proof Button */}
          <div className="text-center">
            <Button
              onClick={proofLocation}
              disabled={!location || !walletAddress || !isCorrectNetwork || isProofing}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold disabled:opacity-50"
            >
              {isProofing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Submitting Proof...
                </>
              ) : (
                "Proof My Location"
              )}
            </Button>
            {(!location || !walletAddress || !isCorrectNetwork) && (
              <p className="text-gray-400 text-sm mt-2">
                {!walletAddress && "Connect your wallet"}
                {!walletAddress && (!location || !isCorrectNetwork) && ", "}
                {!location && "allow location access"}
                {!location && !isCorrectNetwork && ", and "}
                {!isCorrectNetwork && walletAddress && "switch to UZH_ETH_PoS network"} to continue
              </p>
            )}
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${walletAddress ? "bg-green-400" : "bg-gray-400"}`} />
                  <span className="text-white font-medium">
                    {walletAddress ? "Wallet Connected" : "Wallet Not Connected"}
                  </span>
                </div>
                {walletAddress && (
                  <p className="text-gray-400 text-sm mt-2 font-mono">{formatAddress(walletAddress)}</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${location ? "bg-green-400" : "bg-gray-400"}`} />
                  <span className="text-white font-medium">
                    {location ? "Location Acquired" : "Location Not Available"}
                  </span>
                </div>
                {location && <p className="text-gray-400 text-sm mt-2">Accuracy: ±{Math.round(location.accuracy)}m</p>}
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${isCorrectNetwork ? "bg-green-400" : "bg-gray-400"}`} />
                  <span className="text-white font-medium">
                    {isCorrectNetwork ? "Correct Network" : "Wrong Network"}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  {isCorrectNetwork ? "UZH_ETH_PoS" : "Switch to UZH_ETH_PoS"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
