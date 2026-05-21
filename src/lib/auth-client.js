import { createAuthClient } from "better-auth/react"
import { jwt } from "better-auth/plugins"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL ||  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ,
     plugins: [
        jwt(), 
    ]
})

export const { signIn, signUp, signOut, useSession } = createAuthClient()