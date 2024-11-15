'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {login} from '@/app/actions'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const result = await login(formData)

    if (result.error) {
      setError(result.error)
    } else if (result.success) {
      router.push('/game') // Redirect to the game page after successful login
    }
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Game Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <Input
                      id="username"
                      name="username"
                      type="text"
                      required
                      placeholder="Enter your username"
                      className="w-full"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <CardFooter className="mt-6 p-0">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
  )
}