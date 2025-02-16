"use client"
import React from "react";
import { useRef, useEffect, useState } from "react"
import { Volume2, VolumeX, Heart, Play, ChevronUp, ChevronDown, Share2, ArrowUp } from "lucide-react"
import { ShareButton } from "./ShareButton";

export function VideoReel({ reel, playStates, muteStates, setPlayStates, setMuteStates, likes, setLikes }) {
const videoRef = useRef(null)
const containerRef = useRef(null)
const [isClient, setIsClient] = useState(false)
const [isScrolling, setIsScrolling] = useState(false)
const scrollTimeout = useRef(null)

useEffect(() => {
setIsClient(true)
}, [])

useEffect(() => {
if (!isClient || !videoRef.current) return


const playVideo = async () => {
  try {
    await videoRef.current?.play()
    setPlayStates((prev) => ({ ...prev, [reel.id]: true }))
  } catch (error) {
    console.debug("Autoplay prevented:", error)
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        playVideo()
      } else {
        videoRef.current?.pause()
        setPlayStates((prev) => ({ ...prev, [reel.id]: false }))
      }
    })
  },
  {
    threshold: 0.7,
    rootMargin: "0px",
  },
)

observer.observe(videoRef.current)
playVideo()

return () => observer.disconnect()
}, [isClient, reel.id, setPlayStates])

const handleScroll = (e) => {
if (!containerRef.current || !isClient || isScrolling) {
e.preventDefault()
return
}


e.preventDefault()
const scrollAmount = e.deltaY
const currentScroll = window.scrollY
const reelHeight = containerRef.current.clientHeight

const currentReelIndex = Math.round(currentScroll / reelHeight)
const nextReelIndex = scrollAmount > 0 ? currentReelIndex + 1 : currentReelIndex - 1
const targetScroll = nextReelIndex * reelHeight

if (targetScroll >= 0 && targetScroll <= document.documentElement.scrollHeight - window.innerHeight) {
  smoothScrollToReel(targetScroll)
}
}

const smoothScrollToReel = (targetScroll) => {
if (isScrolling || !isClient) return
setIsScrolling(true)


window.scrollTo({
  top: targetScroll,
  behavior: "smooth",
})

setTimeout(() => {
  setIsScrolling(false)
}, 800) // Adjusted timing for smoother feel
}

const handleButtonScroll = (direction) => {
if (!isClient) return


const reelHeight = window.innerHeight
const currentScroll = window.scrollY
const currentReelIndex = Math.round(currentScroll / reelHeight)
const nextReelIndex = direction === "up" ? currentReelIndex - 1 : currentReelIndex + 1
const targetScroll = nextReelIndex * reelHeight

if (targetScroll >= 0 && targetScroll <= document.documentElement.scrollHeight - window.innerHeight) {
  window.scrollTo({
    top: targetScroll,
    behavior: "smooth",
  })
}
}

const togglePlayPause = () => {
if (!videoRef.current || !isClient) return


if (videoRef.current.paused) {
  videoRef.current.play().catch(() => {
    console.debug("Play prevented - waiting for user interaction")
  })
  setPlayStates((prev) => ({ ...prev, [reel.id]: true }))
} else {
  videoRef.current.pause()
  setPlayStates((prev) => ({ ...prev, [reel.id]: false }))
}
}

const toggleMute = () => {
if (!videoRef.current || !isClient) return
videoRef.current.muted = !videoRef.current.muted
setMuteStates((prev) => ({ ...prev, [reel.id]: !prev[reel.id] }))
}

const toggleLike = () => {
if (!isClient) return
setLikes((prev) => ({ ...prev, [reel.id]: !prev[reel.id] }))
}

const handleShare = async () => {
if (!isClient) return


if (navigator.share) {
  try {
    await navigator.share({
      title: reel.title,
      text: "Check this out!",
      url: window.location.href,
    })
  } catch (error) {
    console.debug("Share failed:", error)
  }
} else {
  console.debug("Web Share API not supported")
}
}

useEffect(() => {
return () => {
if (scrollTimeout.current) {
clearTimeout(scrollTimeout.current)
}
}
}, [])

if (!isClient) {
return (
<div className="relative h-screen w-full snap-start">
<div className="h-full w-full bg-gray-900" />
</div>
)
}

return (
<div ref={containerRef} className="relative h-screen w-full snap-start flex items-center justify-center bg-white">


  <div className="fixed top-5 right-4 z-20">
    <button
className="hidden relative right-170 top-20 sm:flex p-2 rounded-full  bg-[#fbb13c]  text-black "
onClick={() => handleButtonScroll('up')}

> <ChevronUp className="h-10 w-10 cursor-pointer relative" /> </button> <div className="fixed bottom-5 right-4 z-20"> <button className="hidden relative right-170 bottom-20 sm:flex p-2 rounded-full bg-[#fbb13c] text-black " onClick={() => handleButtonScroll('down')} > <ChevronDown className="h-10 w-10 cursor-pointer relative" /> </button> </div>

  </div>

  <div className="w-full h-full md:flex md:items-center md:justify-center md:gap-8 md:px-8">
    {/* Video Container */}
    <div className="sticky   w-full h-full md:h-[80vh] md:w-auto md:aspect-[9/16]">
      <video
        ref={videoRef}
        className="h-full w-full object-cover rounded-none md:rounded-xl"
        loop
        playsInline
        muted={muteStates[reel.id]}
        onClick={togglePlayPause}
        src={reel.videoUrl}
        data-reel-id={reel.id}
        autoPlay
      />

      <div className="absolute inset-0 flex items-center justify-center" onClick={togglePlayPause}>
        {!playStates[reel.id] && (
          <button className="p-4 text-white bg-black/30 rounded-full h-16 w-16 flex items-center justify-center">
            <Play className="h-8 w-8" />
          </button>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="absolute right-4 bottom-20 md:bottom-8 flex flex-col gap-4 z-10 md:hidden">
        <button
          className={`p-2 rounded-full bg-black/50 hover:bg-black/60 transition-colors duration-200 ${likes[reel.id] ? "text-red-500" : "text-white"}`}
          onClick={toggleLike}
        >
          <Heart className={`h-6 w-6 ${likes[reel.id] ? "fill-current" : ""}`} />
        </button>
        <button
          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/60 transition-colors duration-200"
          onClick={toggleMute}
        >
          {muteStates[reel.id] ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </button>
        <ShareButton onClick={handleShare} />
      </div>

      {/* Mobile Product Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent md:hidden">
        <h2 className="text-white text-xl font-bold mb-2">{reel.title}</h2>
        <p className="text-white/90 text-sm mb-4">{reel.description}</p>
        <button
          className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          onClick={() => window.open("#", "_blank")}
        >
          Visit Product Page
        </button>
      </div>
    </div>

    {/* Desktop Product Info */}
    <div className="hidden md:flex md:flex-col md:w-96 md:gap-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{reel.title}</h2>
        <p className="text-gray-600">{reel.description}</p>
        <div className="flex items-center gap-4">
         
          <button onClick={handleShare} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <button
        className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        onClick={() => window.open("#", "_blank")}
      >
        Visit Product Page
      </button>
    </div>
  </div>
</div>
)
}