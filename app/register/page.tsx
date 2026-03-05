"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  async function handleRegister() {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error)
      return
    }

    // nach Registrierung direkt einloggen
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    })
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen">
      <h1 className="text-xl font-bold">Registrieren</h1>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Passwort"
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button onClick={handleRegister} className="bg-black text-white px-4 py-2">
        Registrieren
      </button>
    </div>
  )
}
