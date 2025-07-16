"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Shield, Zap, Network, Cpu, Globe, ChevronRight, Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ProofOfLocationLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold text-white">Proof of Location</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How it Works
            </Link>
            <Link href="#use-cases" className="text-gray-300 hover:text-white transition-colors">
              Use Cases
            </Link>
            <Link href="#architecture" className="text-gray-300 hover:text-white transition-colors">
              Architecture
            </Link>
          </nav>
          <div>
            <Link href="/app">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">DApp</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-400">
            Next-Generation Blockchain Infrastructure
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Proof of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Location</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutionary on-chain verification of hardware location through cryptographic proofs. Enabling trusted
            location inputs for smart contracts across multiple blockchain networks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 bg-transparent"
              >
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What is Proof of Location */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What is Proof of Location?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A cryptographic system that provides verifiable, tamper-proof location data from specific hardware devices
              to blockchain networks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">Cryptographic Security</CardTitle>
                <CardDescription className="text-gray-300">
                  Hardware-generated cryptographic proofs ensure location data integrity and prevent spoofing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Network className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">Multi-Chain Support</CardTitle>
                <CardDescription className="text-gray-300">
                  Seamlessly integrates with Ethereum, Cardano, Polkadot, and other major blockchain networks.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Zap className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">Real-Time Verification</CardTitle>
                <CardDescription className="text-gray-300">
                  Instant location verification for time-sensitive smart contract applications.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A seamless flow from hardware verification to multi-chain distribution
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Flow Steps - Fixed to ensure horizontal alignment */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
                {/* Step 1 */}
                <div className="flex-1 text-center">
                  <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Hardware Seed</h3>
                  <p className="text-gray-300 text-sm max-w-xs mx-auto">
                    Specific hardware + software generates cryptographic seed phrase
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex items-center justify-center px-4">
                  <ArrowRight className="h-6 w-6 text-purple-400" />
                </div>

                {/* Step 2 */}
                <div className="flex-1 text-center">
                  <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Crypto Proofs</h3>
                  <p className="text-gray-300 text-sm max-w-xs mx-auto">
                    Hardware creates location proofs and sends to ICP network
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex items-center justify-center px-4">
                  <ArrowRight className="h-6 w-6 text-purple-400" />
                </div>

                {/* Step 3 */}
                <div className="flex-1 text-center">
                  <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Multi-Chain</h3>
                  <p className="text-gray-300 text-sm max-w-xs mx-auto">
                    ICP processes and distributes to Ethereum, Cardano, Polkadot
                  </p>
                </div>
              </div>

              {/* Technical Flow Diagram */}
              <div className="mt-16 bg-white/5 rounded-lg p-8 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Technical Architecture</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 mb-4">
                      <h4 className="text-white font-semibold">Hardware Layer</h4>
                      <p className="text-blue-100 text-sm mt-2">
                        Secure hardware generates location-specific cryptographic seeds
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-4 mb-4">
                      <h4 className="text-white font-semibold">ICP Processing</h4>
                      <p className="text-purple-100 text-sm mt-2">
                        Internet Computer Protocol validates and processes location proofs
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-pink-500 to-red-600 rounded-lg p-4 mb-4">
                      <h4 className="text-white font-semibold">Chain Distribution</h4>
                      <p className="text-pink-100 text-sm mt-2">
                        Verified location data distributed to target blockchain networks
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Use Cases & Applications</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Endless possibilities for location-verified smart contracts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="h-5 w-5 text-purple-400 mr-2" />
                  Supply Chain
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Verify the authentic location of goods throughout the supply chain process.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 text-purple-400 mr-2" />
                  Asset Tracking
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Real-time location verification for high-value assets and equipment.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="h-5 w-5 text-purple-400 mr-2" />
                  DeFi Protocols
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Location-based lending, insurance, and financial products.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="h-5 w-5 text-purple-400 mr-2" />
                  Gaming & Metaverse
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Location-based gaming experiences and virtual world interactions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Network className="h-5 w-5 text-purple-400 mr-2" />
                  IoT Integration
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Secure location data for Internet of Things devices and sensors.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Cpu className="h-5 w-5 text-purple-400 mr-2" />
                  Compliance
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Regulatory compliance for location-sensitive applications.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section id="architecture" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technical Architecture</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built on cutting-edge cryptographic principles and multi-chain infrastructure
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Hardware-Based Security</h4>
                    <p className="text-gray-300">
                      Cryptographic proofs generated directly from secure hardware components
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">ICP Integration</h4>
                    <p className="text-gray-300">
                      Leverages Internet Computer Protocol for scalable processing and validation
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Cross-Chain Compatibility</h4>
                    <p className="text-gray-300">
                      Native support for Ethereum, Cardano, Polkadot, and emerging networks
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Smart Contract Ready</h4>
                    <p className="text-gray-300">Easy integration with existing and new smart contract applications</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Supported Networks</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-600/20 rounded-lg p-4 text-center border border-blue-400/30">
                  <h4 className="text-white font-semibold">Ethereum</h4>
                  <p className="text-blue-300 text-sm">EVM Compatible</p>
                </div>
                <div className="bg-purple-600/20 rounded-lg p-4 text-center border border-purple-400/30">
                  <h4 className="text-white font-semibold">Cardano</h4>
                  <p className="text-purple-300 text-sm">Native Support</p>
                </div>
                <div className="bg-pink-600/20 rounded-lg p-4 text-center border border-pink-400/30">
                  <h4 className="text-white font-semibold">Polkadot</h4>
                  <p className="text-pink-300 text-sm">Parachain Ready</p>
                </div>
                <div className="bg-green-600/20 rounded-lg p-4 text-center border border-green-400/30">
                  <h4 className="text-white font-semibold">ICP</h4>
                  <p className="text-green-300 text-sm">Core Network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the future of location-verified blockchain applications. Connect your wallet to begin exploring Proof
            of Location.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                Launch DApp
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 bg-black/40">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <MapPin className="h-6 w-6 text-purple-400" />
              <span className="text-lg font-bold text-white">Proof of Location</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/app" className="text-gray-400 hover:text-white transition-colors">
                DApp
              </Link>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Proof of Location. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
