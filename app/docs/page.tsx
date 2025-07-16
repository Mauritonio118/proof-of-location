import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  ArrowLeft,
  Shield,
  Network,
  Zap,
  Globe,
  Cpu,
  CheckCircle,
  Users,
  Lock,
  Layers,
  Database,
  ArrowRight,
  AlertCircle,
  ExternalLink,
  Github,
} from "lucide-react"
import Link from "next/link"

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold text-white">Proof of Location</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Mauritonio118/proof-of-location"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="hidden md:inline">Repository</span>
            </a>
            <Link href="/app">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">DApp</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-400">Technical Documentation</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Proof of Location
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 block">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Complete technical documentation for the Proof of Location protocol - a secure, decentralized system for
              generating verifiable cryptographic location proofs.
            </p>
            <div className="flex justify-center mt-6">
              <a
                href="https://github.com/Mauritonio118/proof-of-location"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50 rounded-lg px-4 py-2 text-gray-300 hover:text-white transition-all duration-200"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Table of Contents */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-12">
            <CardHeader>
              <CardTitle className="text-white">Table of Contents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <a href="#overview" className="block text-purple-300 hover:text-purple-200 transition-colors">
                    1. General Overview
                  </a>
                  <a href="#version-0" className="block text-purple-300 hover:text-purple-200 transition-colors">
                    2. Version 0: Functional Prototype
                  </a>
                  <a href="#version-1" className="block text-purple-300 hover:text-purple-200 transition-colors">
                    3. Version 1: Distributed Protocol
                  </a>
                  <a href="#architecture" className="block text-purple-300 hover:text-purple-200 transition-colors">
                    4. Technical Architecture
                  </a>
                </div>
                <div className="space-y-2">
                  <a href="#use-cases" className="block text-purple-300 hover:text-purple-200 transition-colors">
                    5. Use Cases
                  </a>
                  <a href="#security" className="block text-purple-300 hover:text-purple-200 transition-colors">
                    6. Security & Scalability
                  </a>
                  <a href="#governance" className="block text-purple-300 hover:text-purple-200 transition-colors">
                    7. Governance
                  </a>
                  <a href="#privacy" className="block text-purple-300 hover:text-purple-200 transition-colors">
                    8. Privacy Features
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* General Overview */}
          <section id="overview" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Globe className="h-8 w-8 text-purple-400 mr-3" />
              General Overview
            </h2>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  "Proof of Location" is an initiative that seeks to create a secure, decentralized, and practical
                  protocol for generating verifiable cryptographic location proofs. These proofs are designed to become
                  a new type of trusted input for blockchain applications, enabling the integration of spatial and
                  temporal information within smart contracts and decentralized systems.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  The project currently features a Version 0 (proof of concept prototype) and a Version 1 (complete
                  protocol proposal), both detailed in the following sections.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Version 0 */}
          <section id="version-0" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Cpu className="h-8 w-8 text-purple-400 mr-3" />
              Version 0: Functional Prototype (PoC)
            </h2>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  The prototype is a simple yet functional proof of concept. It consists of a Solidity smart contract
                  deployed on a blockchain, which allows location registration based on geolocated data provided by the
                  browser's API.
                </p>

                <h3 className="text-xl font-semibold text-white mb-4">How it Works:</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">
                      The user's device (computer or phone) accesses the browser's geolocation API
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">
                      This API provides: latitude, longitude, accuracy level, and timestamp
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">
                      These four values are stored as strings in the smart contract, maintaining a growing list of
                      entries
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">
                      Each call to the logLocation function adds a new entry without overwriting previous ones
                    </p>
                  </div>
                </div>

                <div className="bg-purple-600/10 border border-purple-400/30 rounded-lg p-6 mb-8">
                  <h4 className="text-lg font-semibold text-purple-300 mb-2">Purpose</h4>
                  <p className="text-gray-300">
                    Demonstrate that it's possible to register location proofs on the blockchain in a simple way using
                    existing browser tools and basic smart contracts.
                  </p>
                </div>

                {/* Deployment Information */}
                <div className="bg-blue-600/10 border border-blue-400/30 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-blue-300 mb-4 flex items-center">
                    <Network className="h-5 w-5 mr-2" />
                    Deployment Information
                  </h4>
                  <p className="text-gray-300 mb-4">
                    The proof of concept is currently deployed on the <strong>UZH_ETH_PoS</strong> network, a blockchain
                    infrastructure provided by the{" "}
                    <a
                      href="https://www.linkedin.com/company/uzh-blockchain-center/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-200 underline inline-flex items-center"
                    >
                      UZH Blockchain Center
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>{" "}
                    at the University of Zurich. To interact with the prototype, you'll need UZHETH tokens, which are
                    the native currency of this network.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-600/5 rounded-lg p-4">
                      <h5 className="text-blue-200 font-semibold mb-2">Network Details</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Network Name:</span>
                          <span className="text-gray-300 font-mono">UZH_ETH_PoS</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Chain ID:</span>
                          <span className="text-gray-300 font-mono">710</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Currency:</span>
                          <span className="text-gray-300 font-mono">UZHETH</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-600/5 rounded-lg p-4">
                      <h5 className="text-blue-200 font-semibold mb-2">Connection</h5>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400 block">RPC URL:</span>
                          <span className="text-gray-300 font-mono text-xs break-all">
                            http://rpc-uzheths.blockchain-group.ch:8546
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-600/5 rounded-lg p-4">
                    <h5 className="text-blue-200 font-semibold mb-2">Smart Contract</h5>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Contract Address:</span>
                        <div className="mt-1">
                          <a
                            href="http://130.60.24.234:4000/address/0x416ae615F8B1607368D9C00376b75091B6511d0B"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-blue-200 font-mono text-xs break-all underline inline-flex items-center"
                          >
                            0x416ae615F8B1607368D9C00376b75091B6511d0B
                            <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-400 italic">
                  <p>
                    Special thanks to the{" "}
                    <a
                      href="https://www.linkedin.com/company/uzh-blockchain-center/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-200 underline"
                    >
                      UZH Blockchain Center
                    </a>{" "}
                    at the University of Zurich for providing the blockchain infrastructure that makes this proof of
                    concept possible.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Version 1 */}
          <section id="version-1" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Network className="h-8 w-8 text-purple-400 mr-3" />
              Version 1: Distributed and Secure Protocol
            </h2>
            <Card className="bg-yellow-600/10 border-yellow-400/30 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-xl font-semibold text-yellow-300">Important Note</h3>
                </div>
                <p className="text-gray-300 text-lg">
                  <strong>Version 1 is not currently developed.</strong> This section serves as a conceptual guide and
                  whitepaper, outlining the vision and proposed architecture for the complete Proof of Location
                  protocol. Only Version 0 (the functional prototype) is currently implemented and available for
                  testing.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Version 1 represents the complete vision of the project. It's no longer just an experiment, but an
                  architecture designed to operate securely, scalably, and with interoperability between blockchains.
                </p>

                <h3 className="text-2xl font-semibold text-white mb-6">Key Components:</h3>

                <div className="space-y-8">
                  {/* Component 1 */}
                  <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-400/30 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
                      <Shield className="h-6 w-6 mr-2" />
                      Unique Key/Device Generation
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        • Starts from the device's own hardware, extracting a unique identification (e.g., fingerprint
                        or chip serial)
                      </li>
                      <li>
                        • Includes installed software identification, ensuring both hardware and software form a
                        verifiable unit
                      </li>
                      <li>
                        • From this combination, a seed phrase or private key that identifies the device is generated
                      </li>
                    </ul>
                  </div>

                  {/* Component 2 */}
                  <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-400/30 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
                      <Zap className="h-6 w-6 mr-2" />
                      Proof Creation
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• The device signs a location proof using the generated key</li>
                      <li>• The proof includes coordinates, timestamp, and relevant metadata</li>
                      <li>• Cryptographic signatures ensure authenticity and non-repudiation</li>
                    </ul>
                  </div>

                  {/* Component 3 */}
                  <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-400/30 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-green-300 mb-4 flex items-center">
                      <Database className="h-6 w-6 mr-2" />
                      Submission to Internet Computer (ICP) Canister
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        • Signed proofs are sent to a canister on ICP, acting as validation and distribution point
                      </li>
                      <li>
                        • This canister can apply different validations, access rules, or additional verifications
                      </li>
                      <li>• Serves as the central hub for proof processing and management</li>
                    </ul>
                  </div>

                  {/* Component 4 */}
                  <div className="bg-gradient-to-r from-pink-600/10 to-red-600/10 border border-pink-400/30 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-pink-300 mb-4 flex items-center">
                      <Layers className="h-6 w-6 mr-2" />
                      Cross-Chain Distribution
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        • From ICP, proofs can be shared with other blockchains: Ethereum, Cardano, Sui, Avalanche,
                        Near, etc.
                      </li>
                      <li>
                        • The protocol functions as a bridge for verifiable spatial information to blockchain systems
                      </li>
                      <li>• Enables multi-chain location verification and interoperability</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Technical Architecture */}
          <section id="architecture" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Layers className="h-8 w-8 text-purple-400 mr-3" />
              Technical Architecture Diagram
            </h2>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  The following diagram explains the complete system flow:
                </p>

                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-8 mb-6">
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Cpu className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Data Sources</h4>
                      <p className="text-gray-300 text-sm">Mobile phones, robots, drones generating geolocated data</p>
                    </div>

                    <div>
                      <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Database className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">ICP Processing</h4>
                      <p className="text-gray-300 text-sm">
                        Validation, privacy management, access control, signed proof handling
                      </p>
                    </div>

                    <div>
                      <div className="bg-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Network className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Multi-Chain</h4>
                      <p className="text-gray-300 text-sm">
                        Distribution to Ethereum, Cardano, Solana, Sui, Avalanche, Near
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center items-center mt-8 space-x-4">
                    <ArrowRight className="h-6 w-6 text-purple-400" />
                    <span className="text-purple-300">Data Flow</span>
                    <ArrowRight className="h-6 w-6 text-purple-400" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">
                      <strong>Left:</strong> Devices generating geolocated data (phones, robots, drones)
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">
                      <strong>Center:</strong> Central module running on Internet Computer (ICP)
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">
                      <strong>Right:</strong> Results used within ICP ecosystem or exported to multiple blockchains
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Use Cases */}
          <section id="use-cases" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Globe className="h-8 w-8 text-purple-400 mr-3" />
              Potential Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">🎮 Geolocalized Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Validate that the player is in a specific location before allowing them to advance or unlock
                    rewards.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">🛡️ Automatic Insurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Coverage based on geographical zones. For example, activate or deactivate insurance when
                    entering/leaving a country.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">📦 Logistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Validate delivery stops, routes, or merchandise location throughout the supply chain.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">📸 Certified Photography</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Proof that a photo was taken at a certain place and time, ensuring authenticity.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">🏛️ Tourism</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Proof of visits to tourist places for rewards, collectibles, or special offers.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">🤖 Robot/Drone Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Ensure that an autonomous machine follows a planned route and operates within designated areas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">⚖️ Geolocalized Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    For certain workers, companies, or regulations requiring physical presence validation.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">🌐 IoT Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Secure location data for Internet of Things devices and environmental sensors.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Security & Scalability */}
          <section id="security" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Shield className="h-8 w-8 text-purple-400 mr-3" />
              Security, Scalability & Governance
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Lock className="h-6 w-6 text-purple-400 mr-2" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    The protocol is designed from conception to be robust against threats such as hacking or data
                    falsification.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Cryptographic measures for data integrity</li>
                    <li>• Hardware/software control mechanisms</li>
                    <li>• Multi-layer validation systems</li>
                    <li>• Tamper-resistant proof generation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="h-6 w-6 text-purple-400 mr-2" />
                    Scalability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Expected to be a highly distributed system without bottlenecks.</p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Anyone can operate a node</li>
                    <li>• Horizontal scaling capabilities</li>
                    <li>• No central authority dependency</li>
                    <li>• Distributed validation network</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Governance */}
          <section id="governance" className="mb-16">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="h-6 w-6 text-purple-400 mr-2" />
                  Governance & Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  The system will be open source and feature community governance, encouraging participation and
                  maintenance through economic mechanisms.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-purple-600/10 rounded-lg p-4 text-center">
                    <h4 className="text-white font-semibold mb-2">Open Source</h4>
                    <p className="text-gray-300 text-sm">Transparent and auditable codebase</p>
                  </div>
                  <div className="bg-purple-600/10 rounded-lg p-4 text-center">
                    <h4 className="text-white font-semibold mb-2">Community Driven</h4>
                    <p className="text-gray-300 text-sm">Decentralized decision making</p>
                  </div>
                  <div className="bg-purple-600/10 rounded-lg p-4 text-center">
                    <h4 className="text-white font-semibold mb-2">Economic Incentives</h4>
                    <p className="text-gray-300 text-sm">Reward participation and maintenance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Privacy */}
          <section id="privacy" className="mb-16">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Lock className="h-6 w-6 text-purple-400 mr-2" />
                  Privacy Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  The protocol allows configurable privacy levels, from completely public information to encrypted or
                  obfuscated proofs depending on the use case. This flexibility will be fundamental to foster protocol
                  adoption in different contexts.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-600/10 border border-green-400/30 rounded-lg p-4 text-center">
                    <h4 className="text-green-300 font-semibold mb-2">Public</h4>
                    <p className="text-gray-300 text-sm">Fully transparent location proofs</p>
                  </div>
                  <div className="bg-yellow-600/10 border border-yellow-400/30 rounded-lg p-4 text-center">
                    <h4 className="text-yellow-300 font-semibold mb-2">Encrypted</h4>
                    <p className="text-gray-300 text-sm">Protected location data with selective disclosure</p>
                  </div>
                  <div className="bg-red-600/10 border border-red-400/30 rounded-lg p-4 text-center">
                    <h4 className="text-red-300 font-semibold mb-2">Obfuscated</h4>
                    <p className="text-gray-300 text-sm">Privacy-preserving location verification</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Try Proof of Location?</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Experience the current prototype (Version 0) of location verification. Connect your wallet and
                  generate your first cryptographic location proof using our functional proof of concept.
                </p>
                <Link href="/app">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                    Launch DApp
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
