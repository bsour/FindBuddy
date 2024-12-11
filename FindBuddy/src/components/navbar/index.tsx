import { FC, useState } from 'react'
import { clsx } from 'clsx'

export const Navbar: FC = () => {
  const [isDark, setIsDark] = useState(true)

  return (
    <nav className="fixed w-full top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-display font-bold tracking-wider">
          FindBuddy
        </div>

        {/* Search */}
        <div className="hidden md:flex">
          <button className="p-2 hover:bg-space-gray rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-space-gray rounded-full transition-colors"
          >
            {isDark ? '🌙' : '☀️'}
          </button>
          <a
            href="/contact"
            className="px-4 py-2 text-sm font-medium text-white hover:text-neon-mint transition-colors"
          >
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar