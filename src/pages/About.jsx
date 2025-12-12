import { motion } from "framer-motion";
import { Sparkles, Users, BookOpen, Award, Star, Calendar, MapPin, Heart } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-yellow-300" />,
      title: "Our Vision",
      description: "To create an unforgettable cultural experience that celebrates creativity, innovation, and the spirit of togetherness."
    },
    {
      icon: <Users className="w-8 h-8 text-pink-300" />,
      title: "Our Community",
      description: "A vibrant community of students, artists, and performers coming together to showcase their talents and create lasting memories."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-300" />,
      title: "Our Story",
      description: "Founded with a passion for cultural exchange, Ekarikthin has grown into one of the most anticipated events of the year."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-300" />,
      title: "Achievements",
      description: "Recognized for excellence in cultural programming and student engagement year after year."
    }
  ];

  const stats = [
    { value: "50+", label: "Events", icon: <Sparkles className="w-6 h-6" /> },
    { value: "1000+", label: "Participants", icon: <Users className="w-6 h-6" /> },
    { value: "3", label: "Days", icon: <Calendar className="w-6 h-6" /> },
    { value: "50+", label: "Workshops", icon: <BookOpen className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24"
      >
        
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400">
            About Ekarikthin 2025
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Where creativity meets culture in an explosion of art, music, and innovation. Join us for an unforgettable journey.
        </motion.p>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative overflow-hidden group"
          >
            <div className="relative p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5 group-hover:border-pink-500/30 transition-all duration-300 h-full hover:bg-black/30">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-600/20 mb-4 text-pink-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-24 text-gray-200">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="relative bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-white/5 h-full group-hover:border-pink-500/30 hover:bg-black/30 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-600/20">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Location Section */}
      <motion.div 
        className="mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/5 p-8 hover:bg-black/30 transition-colors duration-300">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-white mb-6">Our Location</h2>
              <p className="text-gray-400 mb-6">
                Join us at the heart of the cultural extravaganza. Our venue is easily accessible and equipped with all modern amenities to ensure a comfortable experience.
              </p>
              <div className="flex items-center text-pink-400">
                <MapPin className="w-5 h-5 mr-2" />
                <span>NIT Nagaland, Chumukedima, Nagaland - 797103</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-64 bg-gray-700/50 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.9939552335525!2d93.7887753150152!3d25.59203598370041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3749251e9f0a1b1d%3A0x9b2c1c8f1c8f1c8f!2sNIT%20Nagaland!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="opacity-80 hover:opacity-100 transition-opacity"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="text-center relative overflow-hidden rounded-2xl p-12 bg-black/20 backdrop-blur-sm border border-white/5 hover:bg-black/30 transition-colors duration-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        
        <div className="relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to be part of <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">Ekarikthin 2025</span>?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Join us for an unforgettable experience of cultural celebration, learning, and entertainment.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <button className="relative group px-8 py-4 bg-gradient-to-r from-pink-600/90 to-purple-600/90 text-white rounded-full font-medium text-lg overflow-hidden border border-white/20 hover:border-pink-400/60 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                Get Your Tickets Now
                <Heart className="w-5 h-5 ml-2 group-hover:scale-125 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default About;