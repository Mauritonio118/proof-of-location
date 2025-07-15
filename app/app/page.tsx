"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Wallet, ArrowLeft, Loader2 } from "lucide-react"
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

export default function AppPage() {
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [location, setLocation] = useState<LocationData | null>(null)
  const [locationError, setLocationError] = useState<string>("")
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      setIsConnecting(true)
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setWalletAddress(accounts[0])
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

  const proofLocation = () => {
    if (location && walletAddress) {
      // Here you would implement the actual proof generation
      alert(
        `Generating proof for location: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)} with wallet: ${formatAddress(walletAddress)}`,
      )
    } else {
      alert("Please connect your wallet and get your location first.")
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
          <div>
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
              disabled={!location || !walletAddress}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold"
            >
              Proof My Location
            </Button>
            {(!location || !walletAddress) && (
              <p className="text-gray-400 text-sm mt-2">
                {!walletAddress && "Connect your wallet"}
                {!walletAddress && !location && " and "}
                {!location && "allow location access"} to continue
              </p>
            )}
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
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
          </div>
        </div>
      </main>
    </div>
  )
}
