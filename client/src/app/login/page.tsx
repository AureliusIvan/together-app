'use client'

import {useRouter} from 'next/navigation'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()

  function handleSubmit(formData: FormData) {
    const username = formData.get('username')
    localStorage.setItem('username', username as string)
    router.push('/game')
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