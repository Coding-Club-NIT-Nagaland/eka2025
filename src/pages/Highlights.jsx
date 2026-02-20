import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Highlights() {
  const eventHighlights = [
    { alt: "BGMI Winners", date: "February 19, 2026", location: "Classroom 1A", winner: "Will be Updated Soon" },
    { alt: "BGMI Runners Up", date: "February 19, 2026", location: "Classroom 1A", winner: "Will be Updated Soon" },
    { alt: "Mens Marathon", date: "February 19, 2026", location: "NIT Ground", winner: "Will be Updated Soon" },
    { alt: "Womens Marathon", date: "February 19, 2026", location: "NIT Ground", winner: "Will be Updated Soon" },
    { alt: "Spell Bee", date: "February 19, 2026", location: "V.C. Hall", winner: "KAS Flavia" },
    { alt: "Brain Snap", date: "February 19, 2026", location: "V.C. Hall", winner: "Nayan Raj Sinha" },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 mr-2 text-pink-300" />
            <span className="text-pink-300 font-medium">Ekarikthin Events Winners Table</span>
          </div>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="px-6 py-5 border-b border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Ekarikthin Events Winners</h3>
            
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-white/5 text-left">
                  <th className="px-6 py-4 text-sm font-semibold text-pink-300">Event</th>
                  <th className="px-6 py-4 text-sm font-semibold text-pink-300">Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-pink-300">Location</th>
                  <th className="px-6 py-4 text-sm font-semibold text-pink-300">Winner Name</th>
                </tr>
              </thead>
              <tbody>
                {eventHighlights.map((event) => (
                  <tr key={event.alt} className="border-t border-white/10">
                    <td className="px-6 py-4 text-white/95">{event.alt}</td>
                    <td className="px-6 py-4 text-white/80">{event.date}</td>
                    <td className="px-6 py-4 text-white/80">{event.location}</td>
                    <td className="px-6 py-4 text-white font-medium">{event.winner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
