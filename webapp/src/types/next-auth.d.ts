import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: unknown
      id_token?: string
      email: string
      name: string
    }
  }
}
