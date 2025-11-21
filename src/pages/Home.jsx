import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Map from "../components/Map";

/* ============================================================
   🎥 1. CINEMATIC BACKGROUND
============================================================ */
const CinematicBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">

      {/* MAIN DARK GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0b1220] to-black"></div>

      {/* VOLUMETRIC FOG */}
      <motion.div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        animate={{ opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(0,140,255,0.18), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* MOVING SPOTLIGHT BEAM */}
      <motion.div
        className="absolute top-[-40%] left-1/2 w-[1400px] h-[1400px] rounded-full opacity-30"
        animate={{ x: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(circle, rgba(0,180,255,0.25), transparent 70%)",
          filter: "blur(160px)",
        }}
      />

      {/* STAGE LIGHT RAYS */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[140vh] bg-gradient-to-b from-cyan-400/40 to-transparent"
          style={{
            left: `${15 + i * 15}%`,
            opacity: 0.15,
          }}
          animate={{
            y: ["-20%", "20%", "-20%"],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

/* ============================================================
   ⏳ 2. COUNTDOWN TIMER
============================================================ */
const Countdown = () => {
  const target = new Date("2025-02-15T00:00:00");

  const [time, setTime] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) return;

      setTime({
        days: String(Math.floor(diff / 86400000)).padStart(2, "0"),
        hours: String(Math.floor((diff / 3600000) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((diff / 60000) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto mt-10">
      {Object.entries(time).map(([key, value]) => (
        <motion.div
          key={key}
          whileHover={{ scale: 1.06 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl 
                     shadow-[0_0_25px_rgba(0,200,255,0.25)] text-white"
        >
          <div className="text-4xl font-extrabold">{value}</div>
          <div className="text-xs uppercase mt-1 tracking-widest text-cyan-300">
            {key}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ============================================================
   🌌 3. HOMEPAGE HERO
============================================================ */
export default function Home() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const moveX = useTransform(x, [-300, 300], [-20, 20]);
  const moveY = useTransform(y, [-300, 300], [-10, 10]);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      onMouseMove={(e) => {
        x.set(e.clientX - window.innerWidth / 2);
        y.set(e.clientY - window.innerHeight / 2);
      }}
    >
      <CinematicBackground />

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative z-10">

        {/* BADGE */}
        <motion.div
          className="px-6 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 
                     shadow-lg text-white font-semibold mb-6 flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>Ekarikthin 2025 • The Grand Cultural Festival</span>
        </motion.div>

        {/* HERO TITLE */}
        <motion.h1
          style={{ x: moveX, y: moveY }}
          className="text-7xl md:text-8xl font-extrabold 
                     bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300
                     bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,200,255,0.4)]"
        >
          EKARIKTHIN
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-cyan-300 font-bold mt-3 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          THE CULTURAL EXTRAVAGANZA
        </motion.p>

        <motion.p
          className="max-w-2xl mt-6 text-lg md:text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Experience Northeast India's most electrifying cultural festival —
          lights, art, music, dance, and a cinematic celebration of creativity.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Link
            to="/events"
            className="px-8 py-3 rounded-xl font-bold text-lg text-white
                       bg-gradient-to-r from-cyan-500 to-blue-600
                       shadow-[0_0_20px_rgba(0,200,255,0.4)]
                       hover:shadow-[0_0_35px_rgba(0,200,255,0.6)]
                       transition flex items-center gap-2"
          >
            Explore Events <ArrowRight />
          </Link>

          <a
            href="#highlights"
            className="px-8 py-3 rounded-xl font-bold text-lg text-white
                       bg-white/10 backdrop-blur-xl border border-white/20
                       hover:bg-white/20 transition flex items-center gap-2"
          >
            <Play /> Highlights
          </a>
        </motion.div>

        <Countdown />
      </section>

      {/* ================= SINGLE LOGO SHOWCASE ================= */}
      <section className="py-28 relative z-10 text-center">
        <h2 className="text-5xl font-extrabold text-cyan-300 mb-10 drop-shadow-lg">
          Festival Logo
        </h2>

        <motion.div
          className="mx-auto w-[300px] h-[300px] bg-white/10 backdrop-blur-xl 
                     rounded-3xl border border-white/20 shadow-[0_0_40px_rgba(0,200,255,0.4)]
                     flex items-center justify-center overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* 🔥 Replace with your PNG */}
          <img
            src="/yourLogo.png"
            alt="Event Logo"
            className="object-contain p-6"
          />
        </motion.div>
      </section>

      {/* ================= AFTERMOVIE SECTION ================= */}
      <section className="py-28 text-center relative z-10">
        <h2 className="text-5xl font-extrabold text-cyan-300 drop-shadow-lg mb-16">
          Aftermovie 2025
        </h2>

        <motion.div
          className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,200,255,0.5)]
                     border border-white/20 backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <iframe
            className="w-full h-[450px] rounded-3xl"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;"
          ></iframe>
        </motion.div>
      </section>

      {/* ================= EKARIKTHIN 2024 MOVIE SECTION ================= */}
      <section className="py-28 text-center relative z-10">
        <h2 className="text-5xl font-extrabold text-cyan-300 drop-shadow-lg mb-16">
          Ekarikthin 2024 Movie
        </h2>

        <motion.div
          className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,200,255,0.5)]
                     border border-white/20 backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <iframe
            className="w-full h-[450px] rounded-3xl"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;"
          ></iframe>
        </motion.div>
      </section>

      {/* ================= MAP SECTION ================= */}
      <section className="py-28 relative z-10">
        <h2 className="text-4xl font-extrabold text-cyan-300 text-center mb-10">
          Festival Venue Map
        </h2>

        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden bg-white/10 
                        backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,200,255,0.4)] p-6">
          <Map />
        </div>
      </section>
    </div>
  );
}
