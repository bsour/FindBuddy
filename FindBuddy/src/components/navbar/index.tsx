import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ContactModal } from "../modal/ContactModal";
import { useTheme } from "../../hooks/useTheme";

export const Navbar: FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 px-6 py-4 border-b border-gray-700/50 backdrop-blur-sm dark:bg-space-black/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group">
          <motion.div
            className="text-2xl font-display font-bold tracking-wider dark:text-white"
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
          <motion.button
            onClick={toggleTheme}
            className="relative p-2 hover:bg-space-gray rounded-full transition-colors border border-gray-700/50 hover:border-neon-mint w-10 h-10 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90, y: 10 }}
                  animate={{ opacity: 1, rotate: 0, y: 0 }}
                  exit={{ opacity: 0, rotate: 90, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: 90, y: -10 }}
                  animate={{ opacity: 1, rotate: 0, y: 0 }}
                  exit={{ opacity: 0, rotate: -90, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-neon-mint transition-colors"
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
