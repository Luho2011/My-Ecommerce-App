"use client";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useState } from "react"
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Email Login */}
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />
      <button
        onClick={() =>
          signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
          })
        }
        className="bg-black text-white px-4 py-2"
      >
        Login
      </button>

      <p className="text-sm">
        Noch kein Konto?{" "}
        <Link href="/register">
          Registrieren
        </Link>
      </p>

       {/* Google */}
       <button 
        onClick={() => signIn("google", {callbackUrl: "/"})}
        className="bg-green-800 hover:bg-green-600 text-white text-2xl rounded-2xl transition px-6 py-4 shadow border-4-black cursor-pointer flex gap-3 items-center mt-10"
        >
           <FcGoogle className="w-7 h-7" />
           Sign in with Google  
        </button>
    </div>
  )
}