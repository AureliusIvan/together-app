'use server'

import {cookies} from 'next/headers'

export async function getUsername(): Promise<{ username: string | null, error?: string }> {
  const cookieStore = await cookies()
  const username = cookieStore.get('username')

  if (!username) {
    return {username: null, error: 'User is not logged in'}
  }

  return {username: username.value}
}

export async function login(formData: FormData) {
  const username = formData.get('username') as string

  if (!username) {
    return {error: 'Username is required'}
  }

  // Set the cookie
  (await cookies()).set('username', username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })

  return {success: true}
}