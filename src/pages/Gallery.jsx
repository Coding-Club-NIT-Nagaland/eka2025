import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ============================================
   DATA
============================================ */
const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&w=1200", title: "Cultural Performance", category: "cultural" },
  { id: 2, src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&w=1200", title: "Battle of Bands", category: "music" },
  { id: 3, src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&w=1200", title: "Dance Competition", category: "dance" },
  { id: 4, src: "https://images.unsplash.com/photo-1558981033-0fcbf4e3e1c0?auto=format&w=1200", title: "Drama & Mime", category: "theatre" },
  { id: 5, src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&w=1200", title: "Literary Event", category: "literary" },
  { id: 6, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&w=1200", title: "Workshop Session", category: "workshop" },
  { id: 7, src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&w=1200", title: "Art Exhibition", category: "art" },
  { id: 8, src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&w=1200", title: "Fashion Show", category: "fashion" },
];

const categories = ["all", ...new Set(images.map((i) => i.category))];

/* ============================================
   PAGE
============================================ */
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [index, setIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? images
      : images.filter((i) => i.category === activeCategory);

  const scrollRef = useRef(null);

  /* ----- Enable Horizontal Wheel Scrolling ----- */
  const handleWheel = (e) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const open = (img, i) => {
    setSelectedImage(img);
    setIndex(i);
  };

  const navigate = (dir) => {
    const newIndex =
      dir === "prev"
        ? (index - 1 + filtered.length) % filtered.length
        : (index + 1) % filtered.length;

    setIndex(newIndex);
    setSelectedImage(filtered[newIndex]);
  };

  return (
    <div className="min-h-screen py-24 px-6 text-white relative">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
          Gallery
        </h1>
        <p className="text-gray-300 mt-4 text-lg">
          Swipe through the highlights of Ekarikthin 2025
        </p>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.08 }}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full backdrop-blur-xl border transition ${
              activeCategory === cat
                ? "border-cyan-400 bg-white/10 text-cyan-300 shadow-[0_0_12px_#22d3ee]"
                : "border-white/10 text-gray-400 hover:border-cyan-400 hover:text-white"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* =============================================
          PREMIUM CAROUSEL
      ============================================= */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex gap-10 overflow-x-auto no-scrollbar py-6 px-4 snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {filtered.map((img, i) => (
          <motion.div
            key={img.id}
            onClick={() => open(img, i)}
            className="cursor-pointer min-w-[350px] max-w-[350px] snap-center relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition group"
            whileHover={{ scale: 1.05 }}
          >
            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-20"
              transition={{ duration: 0.4 }}
            />

            {/* IMAGE */}
            <img
              src={img.src}
              className="w-full h-[450px] object-cover duration-700 group-hover:scale-110"
            />

            {/* CAPTION */}
            <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 duration-300">
              <h3 className="font-bold">{img.title}</h3>
              <span className="text-xs bg-cyan-500 px-2 py-1 rounded-full">
                {img.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* =============================================
          LIGHTBOX MODAL
      ============================================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white hover:text-cyan-400 transition"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={32} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-6 text-white hover:text-cyan-400 transition"
              onClick={(e) => {
                e.stopPropagation();
                navigate("prev");
              }}
            >
              <ChevronLeft size={42} />
            </button>

            {/* IMAGE */}
            <motion.img
              key={selectedImage.id}
              src={selectedImage.src}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl shadow-[0_0_40px_rgba(34,211,238,0.5)]"
            />

            {/* Next */}
            <button
              className="absolute right-6 text-white hover:text-cyan-400 transition"
              onClick={(e) => {
                e.stopPropagation();
                navigate("next");
              }}
            >
              <ChevronRight size={42} />
            </button>

            {/* Caption */}
            <div className="absolute bottom-6 bg-black/40 px-6 py-2 rounded-full text-sm">
              {selectedImage.title} • {index + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
