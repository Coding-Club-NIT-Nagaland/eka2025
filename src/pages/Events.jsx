import { Calendar, Clock, MapPin, Music, Mic2, Users, Film } from "lucide-react";
import { useState } from "react";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Cultural Night",
      date: "March 15, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "Main Auditorium",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200",
      description:
        "A magical night of traditional, contemporary and regional cultural performances.",
      tag: "✨ Featured Event",
    },
    {
      id: 2,
      title: "Battle of Bands",
      date: "March 16, 2025",
      time: "4:00 PM - 8:00 PM",
      location: "Open Air Theater",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200",
      description:
        "Rock bands clash for the ultimate musical glory. Energy, rhythm & madness!",
      tag: "🎵 Music Fest",
    },
    {
      id: 3,
      title: "Dance Competition",
      date: "March 16, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Dance Studio",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200",
      description:
        "Feel the beat! Performances in classical, hip-hop, fusion, western & more.",
      tag: "💃 Dance Battle",
    },
    {
      id: 4,
      title: "Drama & Mime",
      date: "March 17, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "https://images.unsplash.com/photo-1558981033-0fcbf4e3e1c0?q=80&w=1200",
      description:
        "Theatre, mime, storytelling & emotions — witness power without words.",
      tag: "🎭 Theatre Show",
    },
  ];

  const icons = {
    "Cultural Night": <Users className="w-7 h-7 text-pink-300" />,
    "Battle of Bands": <Music className="w-7 h-7 text-yellow-300" />,
    "Dance Competition": <Film className="w-7 h-7 text-pink-300" />,
    "Drama & Mime": <Mic2 className="w-7 h-7 text-blue-300" />,
  };

  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="min-h-screen w-full pt-24 px-6 relative flex flex-col items-center">

      {/* PAGE TITLE */}
      <h1 className="text-6xl font-extrabold text-white text-center drop-shadow-lg">
        EKARIKTHIN 2025
      </h1>
      <p className="text-gray-300 mt-3 text-lg text-center tracking-wide">
        Celebrate culture, art, music, dance, drama & pure vibes ✨🔥
      </p>

      {/* EVENT CARDS */}
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mt-16 w-full px-2">
        {events.map((ev) => (
          <div
            key={ev.id}
            onClick={() => setSelectedEvent(ev)}
            className="rounded-3xl bg-black/40 border border-white/10 shadow-xl overflow-hidden cursor-pointer hover:border-white/30 transition"
          >
            {/* IMAGE */}
            <div className="relative h-56">
              <img
                src={ev.image}
                alt={ev.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-black/60 px-3 py-1 rounded-full text-white text-xs border border-white/10">
                {ev.tag}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                {icons[ev.title]}
                <h2 className="text-3xl font-bold text-white">{ev.title}</h2>
              </div>

              <p className="text-gray-300 text-sm mb-4">{ev.description}</p>

              <div className="text-gray-200 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-pink-300" /> {ev.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-300" /> {ev.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-300" /> {ev.location}
                </div>
              </div>

              <button className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-md">
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-black/60 border border-white/20 p-8 rounded-3xl max-w-xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-white text-3xl"
            >
              ×
            </button>

            {/* Modal Header */}
            <div className="flex gap-4 items-center mb-6">
              {icons[selectedEvent.title]}
              <div>
                <h1 className="text-4xl font-extrabold text-white">
                  {selectedEvent.title}
                </h1>
                <p className="text-gray-300">
                  {selectedEvent.date} • {selectedEvent.time}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <p className="text-gray-200">{selectedEvent.description}</p>

            <div className="mt-4 bg-white/10 p-4 rounded-xl text-gray-100 border border-white/20">
              <p>📍 Venue: {selectedEvent.location}</p>
              <p>📅 Date: {selectedEvent.date}</p>
              <p>⏰ Time: {selectedEvent.time}</p>
            </div>

            <button className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-bold shadow-lg">
              Register Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
