"use client"

import { useRouter } from "next/navigation"
import { useSession, signOut } from "@/lib/auth-client"

export function useAuth() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  const handleSignOut = async () => {
    await signOut()
    router.push("/sign-in")
  }

  return {
    user: session?.user ?? null,
    session: session?.session ?? null,
    isPending,
    isAuthenticated: !!session?.user,
    signOut: handleSignOut,
  }
}
