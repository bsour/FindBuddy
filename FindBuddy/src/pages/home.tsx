import { FC } from 'react'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const HomePage: FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <main className="flex-grow">
        {/* Main content will go here */}
      </main>
      <Footer />
    </div>
  )
}

export default HomePage