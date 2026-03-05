"use client"
import { useState } from "react"

export default function FilterMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(prev => !prev)}
        className={`bg-black text-white px-6 py-2 rounded-md cursor-pointer ${
            open ? "ml-40" : ""
        }`}
      >
        Filter
      </button>

      {open && (
        <div className="bg-gray-300 w-100 h-full top-0 absolute left-0 z-100 flex flex-col gap-10 pt-20 pl-3">
            <button
              onClick={() => setOpen(prev => !prev)}
              className="cursor-pointer h-10 w-10 text-2xl border-2 rounded hover:scale-110 absolute top-5 right-5"
            >
              X
            </button>
          {children}
        </div>
      )}
    </div>
  )
}
