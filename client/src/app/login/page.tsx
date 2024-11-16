'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const router = useRouter()

  function handleSubmit(formData: FormData) {
    const username = formData.get('username')
    localStorage.setItem('username', username as string)
    router.push('/game')
  }

  return (
      <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-500 flex flex-col items-center justify-center p-4 relative">
        {/* Cloud decorations */}
        <div className="fixed bottom-0 left-0 w-64 h-64 opacity-50">
          <Image
              src="/placeholder.svg?height=256&width=256"
              alt=""
              width={256}
              height={256}
              className="object-contain"
          />
        </div>
        <div className="fixed bottom-0 right-0 w-64 h-64 opacity-50">
          <Image
              src="/placeholder.svg?height=256&width=256"
              alt=""
              width={256}
              height={256}
              className="object-contain"
          />
        </div>

        <Card className="w-full max-w-md bg-white rounded-3xl shadow-xl">
          <CardContent className="p-8">
            {/* Avatar row */}
            <div className="flex justify-center gap-4 mb-6">
              {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-12 bg-gray-200 rounded-lg">
                    <Image
                        src={`/placeholder.svg?height=48&width=48`}
                        alt=""
                        width={48}
                        height={48}
                        className="object-contain"
                    />
                  </div>
              ))}
            </div>

            <h1 className="text-2xl font-bold text-center mb-8">Welcome to Gather</h1>

            <form action={handleSubmit} className="space-y-6">
              <Button
                  variant="outline"
                  type="button"
                  className="w-full flex items-center justify-center gap-2 h-12"
              >
                <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt=""
                    width={20}
                    height={20}
                />
                Sign in with Google
              </Button>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                OR
              </span>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-600">
                  Email
                </label>
                <Input
                    id="email"
                    name="username"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="h-12"
                />
              </div>

              <Button
                  type="submit"
                  className="w-full h-12 bg-[#00e8b1] hover:bg-[#00e8b1]/90 text-black"
              >
                Continue
              </Button>

              <Link
                  href="#"
                  className="block text-center text-sm text-purple-600 hover:text-purple-700"
              >
                Use single sign-on
              </Link>

              <div className="flex items-start gap-2">
                <Checkbox id="verify" className="mt-1" />
                <label htmlFor="verify" className="text-sm text-gray-600">
                  Verify you are human
                  <Image
                      src="/placeholder.svg?height=20&width=80"
                      alt="Cloudflare"
                      width={80}
                      height={20}
                      className="inline-block ml-2"
                  />
                </label>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  )
}