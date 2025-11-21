import { motion } from "framer-motion";
import { Sparkles, Heart, Flame, Flower2, Star, Users } from "lucide-react";

/* ============================================================
   🌸 SAKURA PETALS (CSS ONLY, FULLY BLENDED)
============================================================ */
const SakuraPetals = () => {
  const petals = new Array(25).fill(0);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-30">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-6 mix-blend-screen"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -100,
            rotate: Math.random() * 360,
            opacity: 0.7,
          }}
          animate={{
            x: "+=80",
            y: window.innerHeight + 120,
            rotate: "+=240",
            opacity: 0.35,
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
};

/* ============================================================
   ✨ PURE CSS ANIME ENERGY GLOW (NO IMAGES)
============================================================ */
const AnimeEnergy = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    {/* Cyan soft aura */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.12),transparent_60%)] mix-blend-screen" />

    {/* Hot pink glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(255,80,180,0.15),transparent_70%)] mix-blend-screen" />

    {/* Deep violet ambient */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(150,80,255,0.08),transparent_75%)] mix-blend-screen" />
  </div>
);

/* ============================================================
   🌌 GRAIN + SCANLINES WITHOUT IMAGE (CSS-ONLY)
============================================================ */
const FilmOverlay = () => (
  <>
    {/* Grain simulation using shadows (no images!) */}
    <div className="pointer-events-none absolute inset-0 opacity-[0.12] z-40"
      style={{
        background: `
          repeating-radial-gradient(circle at 0 0, 
          rgba(255,255,255,0.03) 0%, transparent 10%)`
      }}
    />

    {/* Scanlines (soft anime CRT look) */}
    <div className="pointer-events-none absolute inset-0 z-40 opacity-[0.08]"
      style={{
        background: `
          repeating-linear-gradient(
            to bottom,
            transparent 0px,
            rgba(255,255,255,0.05) 2px,
            transparent 4px
          )`
      }}
    />
  </>
);

/* ============================================================
   🌸 MAIN ABOUT PAGE
============================================================ */
const AboutAnime = () => {
  return (
    <div
      className="relative min-h-screen overflow-hidden text-white font-[Kosugi Maru]"
      style={{
        background: "transparent",
        backdropFilter: "none",
      }}
    >
      {/* Anime glow */}
      <AnimeEnergy />

      {/* Sakura petals */}
      <SakuraPetals />

      {/* Grain & scanlines */}
      <FilmOverlay />

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-50 py-40 px-6 text-center max-w-5xl mx-auto">
        <motion.h1
          className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-400 to-blue-300 drop-shadow-[0_0_20px_#ff75e8]"
          style={{ fontFamily: "Zen Tokyo Zoo" }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          EKARIKTHIN 2025
        </motion.h1>

        <motion.p
          className="mt-6 text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-[DotGothic16]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          A festival that feels like an anime opening—  
          filled with energy, emotion & unforgettable moments.
        </motion.p>

        <motion.div
          className="mt-12 flex justify-center gap-10"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-14 h-14 text-yellow-300" />
          <Flame className="w-14 h-14 text-pink-300" />
          <Heart className="w-14 h-14 text-red-400" />
        </motion.div>
      </section>

      {/* ================= NIT NAGALAND ================= */}
      <section className="relative z-50 px-6 py-32 bg-white/10 backdrop-blur-xl border-y border-white/20">
        <motion.h2
          className="text-5xl text-center mb-12 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-[Zen Tokyo Zoo]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          NIT NAGALAND
        </motion.h2>

        <motion.p
          className="text-white/90 text-center max-w-4xl mx-auto text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          A campus tucked among hills—  
          tranquil like a slice-of-life anime.  
          A home where culture, unity, and creativity bloom.
        </motion.p>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="relative z-50 py-28 px-6">
        <motion.h2
          className="text-5xl text-center font-[Zen Tokyo Zoo] bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 mb-20"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          What Makes It Magical?
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {[
            { icon: <Star className="w-16 h-16 text-yellow-300" />, title: "Anime Nights", text: "Vibrant stages glowing like Shibuya." },
            { icon: <Users className="w-16 h-16 text-blue-300" />, title: "Unity", text: "Friendships that feel like a shonen team." },
            { icon: <Flower2 className="w-16 h-16 text-pink-300" />, title: "Sakura Vibes", text: "Warmth & culture blooming everywhere." },
            { icon: <Sparkles className="w-16 h-16 text-cyan-300" />, title: "Magic", text: "Moments that feel like an OP sequence." },
            { icon: <Flame className="w-16 h-16 text-orange-300" />, title: "Passion", text: "Performers with fire in their hearts." },
            { icon: <Heart className="w-16 h-16 text-red-400" />, title: "Emotion", text: "Scenes you'll remember forever." },
          ].map((box, i) => (
            <motion.div
              key={i}
              className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 hover:scale-[1.05] shadow-xl transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12 }}
            >
              <div className="flex justify-center">{box.icon}</div>
              <h3 className="mt-6 text-2xl text-white text-center font-[Kosugi Maru]">
                {box.title}
              </h3>
              <p className="mt-4 text-white/80 text-center font-[DotGothic16]">{box.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="pb-32"></div>
    </div>
  );
};

export default AboutAnime;
