import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VerticalScrollCard = ({ title, description, image, index }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotations = [
    { x: -10, y: 15, z: 0 },
    { x: 10, y: -15, z: 0 },
    { x: -15, y: -10, z: 0 },
    { x: 15, y: 10, z: 0 },
  ];

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, rotations[index % 4].y * 2]
  );
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={ref} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        
        {/* Perspective wrapper */}
        <div className="perspective-[1200px]">
          
          <motion.div
            className="w-80 h-[500px] rounded-2xl shadow-2xl overflow-hidden relative bg-white"
            style={{
              transformStyle: "preserve-3d",
              y,
              rotateX,
              rotateY,
              rotateZ,
            }}
            whileHover={{
              rotateY: 180,
              transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            {/* FRONT SIDE */}
            <div
              className="absolute inset-0 bg-white p-8 flex flex-col items-center justify-center text-center"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">{index + 1}</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600 mb-6 text-sm">{description}</p>

              <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"></div>
            </div>

            {/* BACK SIDE */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-600 p-8 flex items-center justify-center transform rotate-y-180"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        title
                      )}&background=059669&color=fff&size=128`;
                    }}
                  />
                </div>

                <h4 className="text-xl font-bold text-white mb-2">
                  Explore More
                </h4>
                <p className="text-white/80 text-sm">Hover to flip the card</p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VerticalScrollCard;
