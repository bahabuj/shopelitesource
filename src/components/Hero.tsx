import React from 'react';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import LookbookModal from './LookbookModal';

const Hero: React.FC = () => {
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-wider">
          LUXURY
          <br />
          <span className="text-gold">REDEFINED</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover the finest selection of haute couture and designer fashion from the world's most prestigious brands
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group bg-gold text-black font-bold px-8 py-4 rounded-none hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>EXPLORE COLLECTION</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button 
            onClick={() => setIsLookbookOpen(true)}
            className="border-2 border-white text-white font-bold px-8 py-4 rounded-none hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            WATCH LOOKBOOK
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
      </section>

      {/* Lookbook Modal */}
      <LookbookModal 
        isOpen={isLookbookOpen} 
        onClose={() => setIsLookbookOpen(false)} 
      />
    </>
  );
};

export default Hero;