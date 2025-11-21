import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Users, Calendar, Award, MapPin, Star, ChevronUp, ChevronDown } from 'lucide-react';

const cardData = [
  {
    id: 1,
    title: "Our Legacy",
    year: "Since 2010",
    description: "15+ years of celebrating culture, art, and talent across India's premier institutions.",
    stats: [
      { value: "15+", label: "Years" },
      { value: "50+", label: "Events" },
      { value: "100+", label: "Colleges" }
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    color: "from-purple-500/20 to-blue-500/20",
    icon: <Award className="w-8 h-8 text-purple-400" />
  },
  {
    id: 2,
    title: "Cultural Extravaganza",
    year: "2025 Edition",
    description: "Experience the grandeur of traditional and contemporary performances from across India.",
    highlights: [
      "Classical dance performances",
      "Folk art showcases",
      "Musical nights",
      "Drama & theater"
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    color: "from-amber-500/20 to-red-500/20",
    icon: <Star className="w-8 h-8 text-amber-400" />
  },
  {
    id: 3,
    title: "Competitions",
    year: "Prove Your Talent",
    description: "Showcase your skills in various cultural and technical events with exciting prizes.",
    categories: [
      { name: "Performing Arts", count: 12 },
      { name: "Fine Arts", count: 8 },
      { name: "Literary Arts", count: 6 },
      { name: "Digital Arts", count: 5 }
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    color: "from-emerald-500/20 to-cyan-500/20",
    icon: <Users className="w-8 h-8 text-emerald-400" />
  },
  {
    id: 4,
    title: "Join Us",
    year: "Be Part of Ekarikthin 2025",
    description: "Register now to participate, volunteer, or attend the biggest cultural fest of the year.",
    cta: {
      text: "Register Now",
      link: "/register"
    },
    stats: [
      { value: "5000+", label: "Participants" },
      { value: "3", label: "Days" },
      { value: "24/7", label: "Support" }
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    color: "from-rose-500/20 to-pink-500/20",
    icon: <Calendar className="w-8 h-8 text-rose-400" />
  }
];

const Card = ({ data, isActive, onClick, index }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative w-full h-[80vh] rounded-3xl overflow-hidden cursor-pointer group transition-all duration-500 ${
        isActive ? 'flex-[3]' : 'flex-1'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${data.color} opacity-90`} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center mb-4">
            {data.icon}
            <span className="ml-2 text-sm font-medium text-white/80">{data.year}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{data.title}</h3>
          <p className="text-white/90 mb-6 max-w-md">{data.description}</p>
        </div>
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-auto"
            >
              {data.stats && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {data.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {data.highlights && (
                <ul className="space-y-2 mb-6">
                  {data.highlights.map((item, i) => (
                    <li key={i} className="flex items-center text-white/90">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              
              {data.categories && (
                <div className="space-y-3 mb-6">
                  {data.categories.map((category, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm text-white/80 mb-1">
                        <span>{category.name}</span>
                        <span>{category.count} events</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1.5">
                        <div 
                          className="bg-white h-1.5 rounded-full" 
                          style={{ width: `${Math.min(100, category.count * 10)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {data.cta && (
                <a
                  href={data.cta.link}
                  className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-opacity-90 transition-all"
                >
                  {data.cta.text}
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Expand/Collapse Indicator */}
      <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
        {isActive ? (
          <ChevronDown className="w-5 h-5 text-white" />
        ) : (
          <ChevronUp className="w-5 h-5 text-white" />
        )}
      </div>
    </motion.div>
  );
};

const VerticalScrollCards = () => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  
  const yValues = [y1, y2, y3, y4];
  
  // Auto-rotate cards every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cardData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950 opacity-95" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-400 bg-emerald-900/30 rounded-full mb-4">
            About Ekarikthin 2025
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Celebrating Cultural Diversity
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the grand celebration of art, culture, and talent from across the nation
          </p>
        </motion.div>
        
        <div className="h-[100vh] flex flex-col md:flex-row gap-4">
          {cardData.map((card, index) => (
            <motion.div
              key={card.id}
              style={{ y: yValues[index] }}
              className={`h-full transition-all duration-700 ${
                activeCard === index ? 'flex-[3]' : 'flex-1'
              }`}
            >
              <Card
                data={card}
                isActive={activeCard === index}
                onClick={() => setActiveCard(index)}
                index={index}
              />
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12 space-x-2">
          {cardData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCard(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeCard === index ? 'bg-white w-8' : 'bg-white/30'
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerticalScrollCards;
