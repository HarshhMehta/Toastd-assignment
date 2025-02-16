"use client"
import React from "react";
import { useState } from "react"
import { VideoReel } from "./components/VideoReel"
import { reelsData } from "./data/reelData"

function App() {
  const [playStates, setPlayStates] = useState({})
  const [muteStates, setMuteStates] = useState({})
  const [likes, setLikes] = useState({})

  return (
    <main className="min-h-screen">
      {reelsData.map((reel) => (
        <VideoReel
          key={reel.id}
          reel={reel}
          playStates={playStates}
          muteStates={muteStates}
          setPlayStates={setPlayStates}
          setMuteStates={setMuteStates}
          likes={likes}
          setLikes={setLikes}
        />
      ))}
    </main>
  )
}

export default App

