"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

interface EntranceOverlayProps {
  onExploreServices: () => void;
  onExploreMethodology?: () => void;
}

export function EntranceOverlay({
  onExploreServices,
}: EntranceOverlayProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Check reduced motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
    motionQuery.addEventListener("change", motionHandler);
    return () => motionQuery.removeEventListener("change", motionHandler);
  }, []);

  // Robust HTML5 Video Lifecycle & Autoplay Handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct DOM property enforcement for browser autoplay policy compliance
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const handleLoadedData = () => {
      // First frame ready
    };

    const handleCanPlay = () => {
      if (!isReducedMotion && !userPaused && video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setAutoplayBlocked(false);
            })
            .catch((err) => {
              console.warn("[Agletras Video] Autoplay prevented by browser policy:", err.message);
              setAutoplayBlocked(true);
              setIsPlaying(false);
            });
        }
      }
    };

    const handlePlaying = () => {
      setIsPlaying(true);
      setAutoplayBlocked(false);
      setVideoError(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleWaiting = () => {
      // Buffer catchup
    };

    const handleStalled = () => {
      console.warn("[Agletras Video] Stream stalled; awaiting buffer data");
    };

    const handleEnded = () => {
      // Continuous loop recovery guarantee
      if (!isReducedMotion && !userPaused) {
        video.currentTime = 0;
        video.play().catch((err) => {
          console.warn("[Agletras Video] Seamless loop interrupted:", err.message);
        });
      }
    };

    const handleError = () => {
      console.error("[Agletras Video] Playback error encountered:", video.error);
      setVideoError(true);
      setIsPlaying(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!video.paused) {
          video.pause();
        }
      } else {
        if (!isReducedMotion && !userPaused && !autoplayBlocked) {
          video.play().catch(() => {});
        }
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial mount playback attempt
    if (!isReducedMotion && !userPaused) {
      const initialPlay = video.play();
      if (initialPlay !== undefined) {
        initialPlay
          .then(() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
          })
          .catch((err) => {
            console.warn("[Agletras Video] Initial autoplay was blocked:", err.message);
            setAutoplayBlocked(true);
            setIsPlaying(false);
          });
      }
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isReducedMotion, userPaused, autoplayBlocked]);

  // User-Initiated Play / Pause Toggle
  const handleTogglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setUserPaused(false);
      video.play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch((err) => {
          console.error("[Agletras Video] User play request failed:", err);
        });
    } else {
      setUserPaused(true);
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <section
      id="destination-entrance"
      className="min-h-screen flex flex-col justify-center items-center px-6 md:px-10 pt-28 pb-32 text-center relative z-20 pointer-events-none overflow-hidden"
    >
      {/* Atmospheric Media Blend (Supports the 3D Scene Without Obscuring the Living World) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-35 mix-blend-screen">
        {/* Layer 1: High-Resolution Reference Poster (Guaranteed Fallback) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/agletras-emerald-world.png"
            alt="Agletras Cinematic Neural Sanctuary Reference"
            fill
            priority
            className="object-cover object-center filter brightness-[0.6] contrast-[1.14]"
          />
        </div>

        {/* Layer 2: Persistent HTML5 Video Element as Ambient Atmospheric Mist */}
        {!isReducedMotion && !videoError && (
          <video
            ref={videoRef}
            key="agletras-cinematic-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/agletras-emerald-world.png"
            className={`absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-[0.68] contrast-[1.18] transition-opacity duration-1000 ${
              isPlaying ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          >
            <source src="/videos/agletras-neural-world.mp4" type="video/mp4" />
          </video>
        )}

        {/* Layer 3: Atmospheric Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#041F1B] via-transparent to-[#020F0C]/80" />
      </div>

      {/* Hero Content Container (Luminous Airy Frosted Pedestal for Seamless 3D Depth & 100% Readability) */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: isReducedMotion ? 0 : 0.08,
              delayChildren: isReducedMotion ? 0 : 0.04,
            },
          },
        }}
        className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-7 pointer-events-auto px-6 py-8 sm:px-10 sm:py-10 rounded-3xl bg-gradient-to-b from-[#031714]/50 via-[#031714]/38 to-[#031714]/50 border border-[#B7E4D5]/25 backdrop-blur-md shadow-[0_16px_48px_rgba(2,15,12,0.45)]"
      >
        {/* Eyebrow Brand Badge with Unaltered Authentic Logo */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: isReducedMotion ? 0 : 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#073B32]/90 border border-[#B7E4D5]/35 shadow-lg backdrop-blur-md"
        >
          <div className="relative w-5 h-5 rounded-full bg-gradient-to-b from-[#0a4237] to-[#041F1B] p-0.5 border border-[#B7E4D5]/40 flex items-center justify-center shrink-0">
            <Image
              src="/logo.png"
              alt="Agletras Brand Emblem"
              width={20}
              height={20}
              className="w-full h-full object-contain filter contrast-125"
              priority
            />
          </div>
          <span className="text-[11px] uppercase tracking-[0.22em] font-mono text-[#B7E4D5] font-semibold">
            AGLETRAS // RESEARCH INTELLIGENCE
          </span>
        </motion.div>

        {/* Restrained Category Label */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: isReducedMotion ? 0 : 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="text-xs uppercase tracking-[0.25em] font-mono text-[#8DA99E]"
        >
          OSINT · RESEARCH · AUTOMATION · CYBER INTELLIGENCE
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: isReducedMotion ? 0 : 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="text-editorial-hero text-[#F4F2EA] tracking-tight drop-shadow-[0_4px_24px_rgba(2,15,12,0.95)]"
        >
          Intelligence From{" "}
          <span className="italic font-normal text-[#B7E4D5]">
            Open Information.
          </span>
        </motion.h1>

        {/* Plain-Language 5-Second Explanation */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: isReducedMotion ? 0 : 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="text-base sm:text-lg md:text-xl text-[#D6E7E1] max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(2,15,12,0.9)]"
        >
          Agletras helps organizations investigate digital threats, assess exposure, verify information, and turn fragmented open-source data into structured, actionable intelligence.
        </motion.p>

        {/* Primary and Secondary Calls to Action */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: isReducedMotion ? 0 : 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <button
            type="button"
            onClick={onExploreServices}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-[0_4px_24px_rgba(47,168,133,0.3)] hover:shadow-[0_6px_32px_rgba(47,168,133,0.45)] cursor-pointer"
          >
            <span>Explore Services</span>
            <ArrowDown size={15} />
          </button>

          <Link
            href="/research"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium tracking-wide text-[#F4F2EA] bg-[#073B32]/80 hover:bg-[#073B32] border border-[#B7E4D5]/35 hover:border-[#B7E4D5]/65 transition-all backdrop-blur-md shadow-md cursor-pointer"
          >
            <span>View Research</span>
            <ArrowUpRight size={15} className="text-[#B7E4D5]" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating Ambient Motion Control (Unobtrusive Top-Right Status) */}
      {!isReducedMotion && !videoError && (
        <div className="absolute top-24 right-4 sm:right-8 z-30 pointer-events-auto">
          <button
            type="button"
            onClick={handleTogglePlayback}
            aria-label={isPlaying ? "Pause cinematic background video" : "Play cinematic background video"}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#031714]/80 border border-[#B7E4D5]/25 hover:border-[#2FA885] text-[10px] font-mono text-[#B7E4D5] hover:text-[#FFFFFF] transition-all backdrop-blur-md shadow-md group"
            title={isPlaying ? "Pause background animation" : "Resume background animation"}
          >
            {isPlaying ? (
              <>
                <Pause size={10} className="text-[#2FA885] group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Motion Active</span>
              </>
            ) : (
              <>
                <Play size={10} className="text-[#2FA885] group-hover:scale-110 transition-transform" />
                <span>{autoplayBlocked ? "Play Motion" : "Resume Motion"}</span>
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
