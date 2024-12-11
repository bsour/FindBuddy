import { FC } from 'react'
import { FooterContent } from '@/types/components'

interface FooterProps {
  content?: FooterContent
}

const Footer: FC<FooterProps> = ({ content = defaultContent }) => {
  return (
    <footer className="bg-gray-100 dark:bg-space-black py-8">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-gray-600 dark:text-gray-400 text-center">
          {content.copyright}
        </p>
      </div>
    </footer>
  )
}

const defaultContent: FooterContent = {
  copyright: '© 2024 FindBuddy. All rights reserved.'
}

export default Footer