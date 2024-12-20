import { FC, useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Lazy load preview components
const LinkedInPreview = lazy(() => import("./previews/LinkedInPreview"));
const GitHubPreview = lazy(() => import("./previews/GitHubPreview"));

export const ContactModal: FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [activePreview, setActivePreview] = useState<
    "linkedin" | "github" | null
  >(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-space-gray w-[90%] sm:w-[440px] p-6 sm:p-8 rounded-2xl shadow-2xl z-50 border border-gray-200 dark:border-gray-700/50"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold tracking-wider text-gray-900 dark:text-white">
                  LET'S CONNECT
                </h2>
                <motion.button
                  onClick={onClose}
                  whileHover={{ rotate: 90 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-space-black rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Social Links */}
              <div className="space-y-4 relative">
                <motion.a
                  href="https://linkedin.com/in/sourabhbeniwal1"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  onMouseEnter={() => setActivePreview("linkedin")}
                  onMouseLeave={() => setActivePreview(null)}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-space-black/50 hover:bg-gray-100 dark:hover:bg-space-black rounded-xl transition-all duration-300 group border border-gray-200 dark:border-gray-700/50"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-white transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </motion.div>
                  <span className="font-display tracking-wide text-sm text-gray-900 dark:text-white">
                    LINKEDIN PROFILE
                  </span>
                </motion.a>

                <motion.a
                  href="https://github.com/bsour"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  onMouseEnter={() => setActivePreview("github")}
                  onMouseLeave={() => setActivePreview(null)}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-space-black/50 hover:bg-gray-100 dark:hover:bg-space-black rounded-xl transition-all duration-300 group border border-gray-200 dark:border-gray-700/50"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg
                      className="w-6 h-6 text-gray-900 dark:text-white transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.div>
                  <span className="font-display tracking-wide text-sm text-gray-900 dark:text-white">
                    GITHUB PROFILE
                  </span>
                </motion.a>

                {/* Preview Portal */}
                <AnimatePresence>
                  {activePreview && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-full ml-4 top-0 w-80 bg-white dark:bg-space-black rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700/50 overflow-hidden"
                    >
                      <Suspense
                        fallback={
                          <div className="p-4 animate-pulse text-gray-600 dark:text-gray-400">
                            Loading preview...
                          </div>
                        }
                      >
                        {activePreview === "linkedin" && <LinkedInPreview />}
                        {activePreview === "github" && <GitHubPreview />}
                      </Suspense>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
