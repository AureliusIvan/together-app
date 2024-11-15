import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {GamepadIcon as GameController} from 'lucide-react'

export default function HomePage() {
  return (
      <div className="min-h-screen bg-[#1a1c2e] text-white relative overflow-hidden">
        {/* Pixel art background overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=32&width=32')] opacity-10 bg-repeat"/>

        <div className="relative z-10">
          {/* Header section */}
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="font-white text-6xl font-bold mb-6">
              TOGETHER
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Explore a multiplayer pixel universe where every player creates their own adventure
            </p>
          </div>

          {/* Main menu cards */}
          <div className="container mx-auto px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
            <Card className="bg-black/50 border-primary/20 backdrop-blur">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <GameController className="w-12 h-12 mb-4 text-primary"/>
                <h2 className="text-xl font-bold mb-2 text-white">Single Player</h2>
                <p className="text-muted-foreground mb-4 text-white">Begin your solo adventure in our pixel world</p>
                <Button asChild className="w-full">
                  <Link href="/login">Play Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Footer section */}
          <footer className="container mx-auto px-4 py-16 mt-12 text-center text-sm text-muted-foreground">
            <p>Built with Phaser.js and Next.js</p>
          </footer>
        </div>
      </div>
  )
}