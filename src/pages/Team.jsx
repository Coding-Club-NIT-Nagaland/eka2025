import { Linkedin, Instagram, Mail } from "lucide-react";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const team = [
  {
    name: "Aarav Sharma",
    role: "Event Lead",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328a1f06?q=80&w=800",
    bio: "Oversees the entire fest flow — planning, coordination, logistics & execution.",
  },
  {
    name: "Ishita Verma",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800",
    bio: "Designs creative identity — posters, graphics & brand visuals.",
  },
  {
    name: "Rohan Mehta",
    role: "Tech & Production",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=800",
    bio: "Manages sound, lighting, stage setups & A/V production.",
  },
  {
    name: "Saanvi Kapoor",
    role: "Marketing & PR",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800",
    bio: "Crafts content, manages PR, partnerships & promotions.",
  },
];

const CreativeTeam = () => {
  const [selected, setSelected] = useState(null);

  // Spotlight motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlight = useTransform([mouseX, mouseY], ([x, y]) => {
    return `radial-gradient(
      500px circle at ${x}px ${y}px,
      rgba(255,255,255,0.13),
      rgba(0,0,0,0.90)
    )`;
  });

  return (
    <div
      className="min-h-screen pt-28 pb-20 px-6 text-white relative overflow-hidden"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >

      {/* 🌟 FULL PAGE SPOTLIGHT */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: spotlight }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-xl">
            Our Creative Team
          </h1>
          <p className="text-gray-300 mt-3 text-lg">
            The people who bring EKARIKTHIN to life.
          </p>
        </div>

        {/* TEAM GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
          {team.map((member, i) => (
            <HoverTeamCard
              key={i}
              member={member}
              onClick={() => setSelected(member)}
            />
          ))}
        </div>
      </div>

      {/* ---------------- MODAL ---------------- */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50"
          onClick={() => setSelected(null)} // click outside closes
        >
          <div
            className="bg-black/60 border border-white/20 p-8 rounded-3xl max-w-xl w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()} // prevent overlay closing
          >
            {/* ❌ X Button (fixed) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected(null);
              }}
              className="absolute top-4 right-4 text-white text-xl cursor-pointer hover:scale-90 transition"
            >
              ×
            </button>


            <div className="flex gap-6 items-center mb-6">
              <img
                src={selected.image}
                className="w-28 h-28 rounded-2xl object-cover border-2 border-white/20"
              />
              <div>
                <h1 className="text-4xl font-bold">{selected.name}</h1>
                <p className="text-cyan-300">{selected.role}</p>
              </div>
            </div>

            <p className="text-gray-200 leading-relaxed mb-6">
              {selected.bio}
            </p>

            <div className="flex gap-4">
              {[Linkedin, Instagram, Mail].map((Icon, id) => (
                <div
                  key={id}
                  className="p-4 rounded-xl bg-black/40 border border-white/20 hover:bg-black/60 transition cursor-pointer"
                >
                  <Icon className="w-6 h-6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

/* ==========================
   3D HOVER CARD COMPONENT
========================== */
const HoverTeamCard = ({ member, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], ["15deg", "-15deg"]);
  const rotateY = useTransform(x, [-50, 50], ["-15deg", "15deg"]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={onClick}
      className="rounded-3xl bg-black/40 border border-white/10 shadow-xl overflow-hidden cursor-pointer p-4 transition-transform"
      whileHover={{ scale: 1.07, boxShadow: "0 25px 45px rgba(0,0,0,0.55)" }}
    >
      {/* IMAGE */}
      <div className="h-56 rounded-2xl overflow-hidden">
        <motion.img
          src={member.image}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold">{member.name}</h2>
        <p className="text-cyan-300 text-sm mt-1">{member.role}</p>
        <p className="text-gray-300 text-sm mt-3">{member.bio}</p>

        {/* Social Icons */}
        <div className="flex gap-3 mt-4">
          {[Linkedin, Instagram, Mail].map((Icon, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.15, y: -3 }}
              className="p-3 rounded-xl bg-black/40 border border-white/10 hover:bg-black/60 transition"
            >
              <Icon className="w-5 h-5" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CreativeTeam;
