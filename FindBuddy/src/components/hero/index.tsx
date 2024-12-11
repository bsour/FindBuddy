import { FC } from 'react'

export const Hero: FC = () => {
  return (
    <div className="min-h-screen bg-space-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side */}
          <div className="space-y-8">
            <h1 className="text-6xl font-display font-bold tracking-wider leading-tight">
              DIVE INTO<br />
              SPACE<br />
              WORLD
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src="/avatar.jpg" alt="First voyager" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-medium">JANA MULLER</div>
                <div className="text-sm text-gray-400">First voyager</div>
              </div>
            </div>

            <button className="btn-primary">
              FLY WITH US
            </button>
          </div>

          {/* Right side */}
          <div className="relative">
            {/* Add your 3D model or image here */}
            <div className="absolute top-4 right-4 text-sm">
              <div>The first commercial</div>
              <div>worldwide spaceline</div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 rounded-2xl bg-space-gray p-8">
          <div>
            <h2 className="text-2xl font-display font-bold mb-2">ABOVE SKY</h2>
            <p className="text-gray-400">
              Humans were dreaming about space<br />
              for centuries and we will hit that dream.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-mono">00:03:17</div>
              <div className="text-sm text-gray-400">Time to first test launch</div>
            </div>
            <div className="flex items-center gap-2">
              <div>Tested and approved by</div>
              <img src="/nasa-logo.png" alt="NASA" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero