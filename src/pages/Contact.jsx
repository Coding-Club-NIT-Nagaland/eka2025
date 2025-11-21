import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, User, MessageSquare, MailCheck } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-6 md:p-12 relative overflow-hidden text-white"
    >
      {/* IIT Techfest Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black opacity-90"></div>

      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#4441_1px,transparent_1px),linear-gradient(to_bottom,#4441_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Floating Neon Orbs */}
      <motion.div
        animate={{ y: [0, -40, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full top-10 left-10"
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute w-80 h-80 bg-blue-600/20 blur-3xl rounded-full bottom-10 right-10"
      />

      {/* Page Header */}
      <div className="relative mb-16 text-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-6xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
        >
          Contact The Team
        </motion.h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-4">
          Reach out to the organizing committee of EKARIKTHIN 2025.  
          We respond within 24 hours.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto relative">

        {/* ===== LEFT: CONTACT INFO ===== */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,255,255,0.15)] relative overflow-hidden"
        >
          {/* Neon Top Border */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-cyan-400 to-blue-500"></div>

          <h2 className="text-3xl font-semibold mb-10 text-cyan-300">
            Connect With Us
          </h2>

          <div className="space-y-8">

            {/* Email */}
            <motion.div
              whileHover={{ x: 8 }}
              className="flex gap-5 items-start"
            >
              <div className="p-4 rounded-xl bg-cyan-600/20 backdrop-blur-lg border border-cyan-500/20">
                <Mail className="w-7 h-7 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-200">Email</h3>
                <p className="text-gray-400 hover:text-white transition">contact@ekarikthin2025.com</p>
                <p className="text-gray-400 hover:text-white transition">support@ekarikthin2025.com</p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div whileHover={{ x: 8 }} className="flex gap-5 items-start">
              <div className="p-4 rounded-xl bg-blue-600/20 backdrop-blur-lg border border-blue-500/20">
                <Phone className="w-7 h-7 text-blue-300" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-200">Phone</h3>
                <p className="text-gray-400 hover:text-white transition">+91 98765 43210</p>
                <p className="text-gray-400 hover:text-white transition">+91 98765 43211</p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div whileHover={{ x: 8 }} className="flex gap-5 items-start">
              <div className="p-4 rounded-xl bg-emerald-600/20 backdrop-blur-lg border border-emerald-500/20">
                <MapPin className="w-7 h-7 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-200">Address</h3>
                <p className="text-gray-400 hover:text-white transition">NIT Nagaland</p>
                <p className="text-gray-400 hover:text-white transition">Chumukedima, Dimapur, 797103</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ===== RIGHT: CONTACT FORM ===== */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,255,255,0.15)] relative overflow-hidden"
        >
          {/* Neon Border */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-400 to-purple-500"></div>

          <h2 className="text-3xl font-semibold mb-10 text-blue-300">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full py-3 pl-12 pr-4 bg-white/10 border border-white/20 rounded-xl text-gray-100 focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full py-3 pl-12 pr-4 bg-white/10 border border-white/20 rounded-xl text-gray-100 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                className="w-full py-3 pl-12 pr-4 bg-white/10 border border-white/20 rounded-xl text-gray-100 focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-semibold tracking-wide flex items-center justify-center transition-all ${
                isSubmitting
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:-translate-y-1"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="loader border-t-white"></span>
                  Sending...
                </span>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" /> Send Message
                </>
              )}
            </button>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 bg-green-900/40 border border-green-500/20 rounded-xl flex items-center gap-3"
                >
                  <MailCheck className="w-6 h-6 text-green-400" />
                  <p className="text-green-300">
                    Message sent successfully! We'll get back to you soon.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
