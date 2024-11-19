import Link from "next/link"
import {ChevronDown, ChevronRight, MessageSquare, Users, Video, Zap} from 'lucide-react'
import {Button, buttonVariants} from "@/components/ui/button"
import {cn} from "@/lib/utils";

export default function HomePage() {
  return (
      <div className="min-h-screen bg-gradient-to-b from-[#1e2335] to-[#2a3267]">
        {/* Navigation */}
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-white font-semibold text-xl flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"/>
              </div>
              Together
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-white">
                Product <ChevronDown className="ml-1 h-4 w-4"/>
              </Button>
              <Button variant="ghost" className="text-white">
                Solutions <ChevronDown className="ml-1 h-4 w-4"/>
              </Button>
              <Button variant="ghost" className="text-white">
                Pricing
              </Button>
              <Button variant="ghost" className="text-white">
                Resources <ChevronDown className="ml-1 h-4 w-4"/>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white">
              Contact Sales
            </Button>
            <Button className="bg-[#00e8b1] text-black hover:bg-[#00e8b1]/90">
              Get started
            </Button>
            <Link
                href={"/login"}
                className={cn(buttonVariants({variant: "default"}), "text-white border-white hover:bg-white/10" )}>
              Sign in
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-24 pb-32">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold text-white mb-6">
              Your Virtual HQ
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Gather brings the best of in-person collaboration to distributed teams.
            </p>
            <div className="flex items-center space-x-4">
              <Button className="bg-[#00e8b1] text-black hover:bg-[#00e8b1]/90 px-8 py-6 text-lg">
                Get started
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10 px-8 py-6 text-lg">
                Or take a tour <ChevronRight className="ml-2 h-5 w-5"/>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: Users, title: "Team Building", description: "Foster connections in a fun, interactive space"},
                {
                  icon: Video,
                  title: "Video Conferencing",
                  description: "Seamless integration for face-to-face meetings"
                },
                {
                  icon: MessageSquare,
                  title: "Chat & Collaboration",
                  description: "Real-time messaging and file sharing"
                },
                {icon: Zap, title: "Customizable Spaces", description: "Create unique environments for your team"},
              ].map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <feature.icon className="h-12 w-12 text-[#00e8b1] mb-4"/>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-gray-100 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah L.",
                  role: "Product Manager",
                  quote: "Gather has transformed the way our remote team collaborates. It's like we're all in the same office!"
                },
                {
                  name: "Mike R.",
                  role: "Software Engineer",
                  quote: "The customizable spaces make our virtual office feel unique and fun. It's boosted our team morale significantly."
                },
                {
                  name: "Emily T.",
                  role: "HR Director",
                  quote: "Onboarding new employees has never been easier. Gather creates a welcoming environment for newcomers."
                },
              ].map((testimonial, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-600 mb-4">&#34;{testimonial.quote}&#34;</p>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#1e2335] py-24 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to transform your team&#39;s collaboration?</h2>
            <p className="text-xl mb-8">Join thousands of companies already using Gather to bring their teams
              closer.</p>
            <Button className="bg-[#00e8b1] text-black hover:bg-[#00e8b1]/90 px-8 py-6 text-lg">
              Get started for free
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#1e2335] text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:text-[#00e8b1]">Features</Link></li>
                  <li><Link href="#" className="hover:text-[#00e8b1]">Integrations</Link></li>
                  <li><Link href="#" className="hover:text-[#00e8b1]">Pricing</Link></li>
                  <li><Link href="#" className="hover:text-[#00e8b1]">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:text-[#00e8b1]">About Us</Link></li>
                  <li><Link href="#" className="hover:text-[#00e8b1]">Careers</Link></li>
                  <li><Link href="#" className="hover:text-[#00e8b1]">Blog</Link></li>
                  <li><Link href="#" className="hover:text-[#00e8b1]">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:text-[#00e8b1]">Community</Link></li>
                  <li><Link href="#" className="hover:text-[#00e8b1]">Support</Link></li>
                  <li><Link href="#" className="hover:text-[#00e8b1]">Privacy</Link></li>
                  <li><Link href="#" className="hover:text-[#00e8b1]">Terms of Service</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <Link href="#" className="hover:text-[#00e8b1]">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clipRule="evenodd"/>
                    </svg>
                  </Link>
                  <Link href="#" className="hover:text-[#00e8b1]">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                          d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </Link>
                  <Link href="#" className="hover:text-[#00e8b1]">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p>&copy; 2024 Gather. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-2 h-2 bg-white/20 rounded-full"/>
          <div className="absolute top-40 left-1/4 w-1 h-1 bg-white/30 rounded-full"/>
          <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-white/10 rounded-full"/>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/20 rounded-full"/>
        </div>
      </div>
  )
}