import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ============================================================
   🎬 ULTRA SMOOTH NETFLIX AUTO-SCROLL CAROUSEL (BIG CARDS)
============================================================ */
const NetflixCarousel = ({ images }) => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // AUTO SCROLL (Smooth, infinite)
  useEffect(() => {
    if (!scrollRef.current) return;

    let scrollX = 0;
    const speed = 1.2; // ⭐ Increase for faster scroll

    const scroll = () => {
      if (!isHovered) {
        scrollX += speed;
        scrollRef.current.scrollLeft = scrollX;

        // If reached end → restart smoothly
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth - 2
        ) {
          scrollX = 0;
        }
      }
      requestAnimationFrame(scroll);
    };

    scroll();
  }, [isHovered]);

  return (
    <div className="relative py-10">

      <div
        ref={scrollRef}
        className="
          flex gap-10 overflow-x-scroll no-scrollbar px-4 pb-6 
          snap-x snap-mandatory select-none
        "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Duplicate list 3x for infinite scrolling */}
        {[...images, ...images, ...images].map((img, i) => (
          <motion.div
            key={i}
            className="
              min-w-[600px] max-w-[600px] h-[340px] 
              relative rounded-3xl overflow-hidden
              shadow-[0_0_35px_rgba(0,200,255,0.35)]
              bg-white/5 border border-white/10 backdrop-blur-xl
              cursor-pointer group snap-center
              transition-transform
            "
            whileHover={{ scale: 1.06 }}
          >
            {/* ✨ Main Image */}
            <img
              src={img.src}
              alt={img.alt}
              className="
                w-full h-full object-cover
                duration-700 group-hover:scale-110
              "
            />

            {/* ✨ Shine Sweep */}
            <motion.div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-transparent via-white/20 to-transparent
                opacity-0
              "
              animate={{ x: ["-160%", "160%"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />

            {/* ✨ Caption */}
            <div
              className="
                absolute bottom-5 left-1/2 -translate-x-1/2
                bg-black/50 backdrop-blur-xl px-6 py-2 rounded-full
                text-white text-lg font-semibold shadow-xl
              "
            >
              {img.alt}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   PAGE
============================================================ */
export default function Highlights() {
  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87", alt: "Cultural Performance" },
    { src: "https://images.unsplash.com/photo-1531913764164-f85c52d6e654", alt: "Art Exhibition" },
    { src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3", alt: "Musical Night" },
    { src: "https://images.unsplash.com/photo-1579389083395-4506e6ffef75", alt: "Drama Performance" },
    { src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8", alt: "Literary Event" },
    { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655", alt: "Workshop Session" }
  ];

  return (
    <section className="py-24 px-6 text-white relative z-10">

      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="
          text-6xl font-extrabold
          bg-gradient-to-r from-cyan-300 to-blue-400
          bg-clip-text text-transparent drop-shadow-xl
        ">
          Highlights
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4"></div>
      </div>

      {/* Netflix Carousel */}
      <NetflixCarousel images={galleryImages} />
    </section>
  );
}
