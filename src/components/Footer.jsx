import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="w-full bg-gray-900 border-t border-white/10 pt-10 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left max-w-lg">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Ekarikthin 2025
            </h3>
            <p className="text-gray-300">
              Experience the cultural extravaganza that brings together art, music,
              and tradition from across the region.
            </p>
            <p className="text-gray-300 mt-1">© {currentYear} All Rights Reserved</p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
              <a
                key={social}
                href={`https://${social}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500/10">
                  <span className="text-lg">
                    {social === 'facebook'
                      ? 'f'
                      : social === 'twitter'
                      ? '𝕏'
                      : social === 'instagram'
                      ? '📷'
                      : '▶️'}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          
          {/* Credit */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              Made with ❤️ by Ekarikthin Team
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link to="/terms" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-600">•</span>
            <Link to="/faq" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
