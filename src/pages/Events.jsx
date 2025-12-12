import { Calendar, Clock, MapPin, ArrowRight, X, Award, ExternalLink, Star, Users, Music, Film, Mic2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const events = [
    {
      id: 1,
      title: "Cultural Night",
      date: "March 15, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "Main Auditorium",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200",
      description: "A magical night of traditional, contemporary and regional cultural performances that showcase the rich diversity of our cultural heritage. Experience an evening filled with vibrant colors, captivating music, and mesmerizing performances that will leave you spellbound.",
      shortDescription: "A magical night of traditional, contemporary and regional cultural performances.",
      tag: "✨ Featured Event",
      prizePool: 100000,
      teamSize: "Unlimited",
      registrationLink: "#",
      rules: [
        "Maximum performance time: 10 minutes",
        "No explicit or offensive content",
        "Participants must report 1 hour before the event",
        "Judges' decision will be final"
      ],
      highlights: [
        "Open to all cultural dance and music forms",
        "Professional sound and lighting provided",
        "Winning team gets direct entry to the finals next year"
      ]
    },
    {
      id: 2,
      title: "Battle of Bands",
      date: "March 16, 2025",
      time: "4:00 PM - 8:00 PM",
      location: "Open Air Theater",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200",
      description: "Rock bands clash for the ultimate musical glory in this high-energy competition. Showcase your musical talent, stage presence, and crowd engagement as you battle it out with the best bands from across the region.",
      shortDescription: "Rock bands clash for the ultimate musical glory. Energy, rhythm & madness!",
      tag: "🎵 Music Fest",
      prizePool: 75000,
      teamSize: "2-8 members",
      registrationLink: "#",
      rules: [
        "Maximum 15 minutes performance time",
        "Original compositions get bonus points",
        "Bands must bring their own instruments (drums will be provided)",
        "No explicit lyrics or content"
      ],
      highlights: [
        "Professional sound system and stage setup",
        "Judges from the music industry",
        "Winner gets a recording studio session"
      ]
    },
    {
      id: 3,
      title: "Stand-up Comedy",
      date: "March 17, 2025",
      time: "7:00 PM - 9:30 PM",
      location: "Amphitheater",
      image: "https://images.unsplash.com/photo-1505373876331-ff89baa1df76?q=80&w=1200",
      description: "Laughter is the best medicine, and we're prescribing a heavy dose! Showcase your comedic timing, wit, and stage presence in this stand-up comedy competition.",
      shortDescription: "Bring the house down with your humor and wit in this stand-up comedy competition.",
      tag: "😂 Comedy Show",
      prizePool: 50000,
      teamSize: "Solo",
      registrationLink: "#",
      rules: [
        "Maximum 7 minutes per performance",
        "No offensive or discriminatory content",
        "Material must be original",
        "Judges' decision will be final"
      ],
      highlights: [
        "Open mic for all participants",
        "Judged by professional comedians",
        "Winner gets a spot in a professional comedy show"
      ]
    },
    {
      id: 4,
      title: "Drama & Mime",
      date: "March 17, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "https://images.unsplash.com/photo-1558981033-0fcbf4e3e1c0?q=80&w=1200",
      description: "Experience the power of silence and expression in this unique competition that celebrates the art of mime and drama. Participants will be judged on their ability to convey emotions, tell stories, and captivate the audience without words.",
      shortDescription: "Theatre, mime, storytelling & emotions — witness power without words.",
      tag: "🎭 Theatre Show",
      prizePool: 45000,
      teamSize: "1-6 members",
      registrationLink: "#",
      rules: [
        "Time limit: 8-10 minutes per performance",
        "No verbal communication allowed in mime category",
        "Limited props allowed (must be approved in advance)",
        "Content must be original"
      ],
      highlights: [
        "Categories: Mime, Street Play, and Mono Act",
        "Professional stage and lighting setup",
        "Special workshop with renowned theatre artists"
      ]
    },
  ];

  const icons = {
    "Cultural Night": <Users className="w-7 h-7 text-pink-300" />,
    "Battle of Bands": <Music className="w-7 h-7 text-yellow-300" />,
    "Stand-up Comedy": <Film className="w-7 h-7 text-pink-300" />,
    "Drama & Mime": <Mic2 className="w-7 h-7 text-blue-300" />,
  };

  const getCategoryColor = (tag) => {
    switch(tag) {
      case '✨ Featured Event': return 'from-pink-500 to-purple-600';
      case '🎵 Music Fest': return 'from-yellow-500 to-amber-600';
      case '😂 Comedy Show': return 'from-pink-500 to-rose-600';
      case '🎭 Theatre Show': return 'from-blue-500 to-cyan-600';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <div className="min-h-screen w-full pt-24 px-6 relative flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-4">
            Events & Competitions
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the excitement of Ekarikthin 2025 through our diverse range of events and competitions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-transparent rounded-xl overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
              onClick={() => openModal(event)}
            >
              <div className="relative h-48 overflow-hidden rounded-xl border border-white/5">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500/20 text-amber-400">
                      {event.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                </div>
              </div>
              <div className="p-4 text-white">
                <div className="flex items-center space-x-4 text-sm text-gray-200 mb-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-amber-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-amber-400" />
                    <span>{event.time}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{event.shortDescription}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-amber-400">
                    <MapPin className="w-4 h-4 mr-1 text-amber-400" />
                    <span>{event.location}</span>
                  </div>
                  <button className="text-white hover:text-amber-300 text-sm font-medium flex items-center hover:underline">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {isModalOpen && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 transition-opacity"
                onClick={closeModal}
              >
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="inline-block align-bottom bg-gray-900 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full mx-4 border border-gray-800"
              >
                <div className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={closeModal}
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-500/20 text-amber-400">
                          {selectedEvent.tag}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white">{selectedEvent.title}</h2>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-2">
                        <h3 className="text-xl font-bold mb-4 text-amber-400">About the Event</h3>
                        <p className="text-gray-300 mb-6">{selectedEvent.description}</p>
                        
                        <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                          <h4 className="font-medium text-white mb-3 flex items-center">
                            <Award className="w-5 h-5 mr-2 text-amber-400" />
                            Prize Pool
                          </h4>
                          <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                            ₹{selectedEvent.prizePool.toLocaleString()}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="text-sm text-gray-400 mb-1">Date & Time</div>
                            <div className="font-medium">
                              <div>{selectedEvent.date}</div>
                              <div className="text-sm text-gray-300">{selectedEvent.time}</div>
                            </div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="text-sm text-gray-400 mb-1">Location</div>
                            <div className="font-medium flex items-center">
                              <MapPin className="w-4 h-4 mr-1 text-amber-400" />
                              {selectedEvent.location}
                            </div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="text-sm text-gray-400 mb-1">Team Size</div>
                            <div className="font-medium flex items-center">
                              <Users className="w-4 h-4 mr-1 text-amber-400" />
                              {selectedEvent.teamSize}
                            </div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="text-sm text-gray-400 mb-1">Category</div>
                            <div className="font-medium">{selectedEvent.tag}</div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-medium text-white mb-3 flex items-center">
                            <Star className="w-5 h-5 mr-2 text-amber-400" />
                            Event Highlights
                          </h4>
                          <ul className="space-y-2">
                            {selectedEvent.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-amber-400 mr-2">•</span>
                                <span className="text-gray-300">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="md:border-l md:border-gray-800 md:pl-6">
                        <div className="sticky top-6">
                          <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
                            <h4 className="font-medium text-white mb-4">Rules & Guidelines</h4>
                            <ul className="space-y-3">
                              {selectedEvent.rules.map((rule, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-amber-400 mr-2">•</span>
                                  <span className="text-gray-300 text-sm">{rule}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <a
                            href={selectedEvent.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02]"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Register Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
