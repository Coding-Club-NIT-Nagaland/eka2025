import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const Map = () => {
  const location = {
    lat: 26.1445,  // Example coordinates for your location
    lng: 91.7362,
    zoom: 15,
    name: 'Ekarikthin Venue',
    address: 'Your Venue Name, City, State, PIN'
  };

  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.87304195296!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDA4JzQwLjIiTiA5McKwNDQnMTAuMyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin&z=${location.zoom}`;

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Venue Location</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join us at our amazing venue for an unforgettable experience of culture, music, and celebration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        >
          <div className="aspect-w-16 aspect-h-9 w-full h-96 md:h-[500px]">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ekarikthin 2025 Venue Location"
              className="w-full h-full"
            ></iframe>
          </div>
          
          <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <MapPin className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white">{location.name}</h3>
                <p className="text-gray-300">{location.address}</p>
                <a
                  href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Open in Google Maps
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Map;
