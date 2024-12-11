import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ContactModal } from "../modal/ContactModal";

export const Navbar: FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 px-6 py-4 border-b border-gray-700/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group">
          <motion.div
            className="text-2xl font-display font-bold tracking-wider"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="bg-gradient-to-r from-neon-mint to-blue-400 bg-clip-text text-transparent">
              Find
            </span>
            <span>Buddy</span>
          </motion.div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-space-gray rounded-full transition-colors border border-gray-700/50 hover:border-neon-mint"
          >
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: isDark ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isDark ? "🌙" : "☀️"}
            </motion.span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white hover:text-neon-mint transition-colors"
          >
            CONTACT
          </button>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
