import { FC } from 'react'
import { FooterContent } from '@/types/components'

interface FooterProps {
  content?: FooterContent
}

const Footer: FC<FooterProps> = ({ content = defaultContent }) => {
  return (
    <footer>
      <div>
        <p>{content.copyright}</p>
      </div>
    </footer>
  )
}

const defaultContent: FooterContent = {
  copyright: '© 2024 FindBuddy. All rights reserved.'
}

export default Footer