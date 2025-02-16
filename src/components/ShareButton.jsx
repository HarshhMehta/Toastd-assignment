import { Share2 } from "lucide-react"
import React from "react";
export function ShareButton({ onClick }) {
  return (
    <button
      className="p-2 rounded-full bg-black/50 text-white hover:bg-black/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
      onClick={onClick}
    >
      <Share2 className="h-6 w-6" />
    </button>
  ) 
}

