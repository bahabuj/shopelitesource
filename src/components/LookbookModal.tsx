import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LookbookModal: React.FC<LookbookModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const lookbookSlides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'SPRING COLLECTION 2025',
      subtitle: 'Ethereal Elegance',
      description: 'Discover flowing silhouettes and delicate fabrics that capture the essence of modern femininity'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'EXECUTIVE POWER',
      subtitle: 'Sophisticated Authority',
      description: 'Tailored pieces that command respect while maintaining effortless style and comfort'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'EVENING GLAMOUR',
      subtitle: 'Timeless Luxury',
      description: 'Exquisite evening wear that transforms every occasion into an unforgettable moment'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'CASUAL LUXURY',
      subtitle: 'Effortless Chic',
      description: 'Elevated everyday pieces that blur the line between comfort and sophistication'
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'ACCESSORIES COLLECTION',
      subtitle: 'Perfect Finishing Touches',
      description: 'Curated accessories that complete your look with unparalleled attention to detail'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying || !isOpen) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % lookbookSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, isOpen, lookbookSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % lookbookSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + lookbookSlides.length) % lookbookSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!isOpen) return null;

  const currentSlideData = lookbookSlides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-300"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-6 left-6 z-20 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-300"
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </button>

      {/* Main Content */}
      <div className="relative h-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={currentSlideData.image}
            alt={currentSlideData.title}
            className="w-full h-full object-cover transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="mb-4">
                <span className="text-gold text-sm font-bold tracking-widest">
                  ELITE SOURCE LOOKBOOK
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 tracking-wider leading-tight">
                {currentSlideData.title}
              </h1>
              
              <h2 className="text-2xl lg:text-3xl text-gold mb-6 font-light tracking-wide">
                {currentSlideData.subtitle}
              </h2>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-lg">
                {currentSlideData.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gold text-black font-bold px-8 py-4 hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                  SHOP THIS LOOK
                </button>
                <button className="border-2 border-white text-white font-bold px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                  VIEW COLLECTION
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {lookbookSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-gold scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="h-1 bg-white/20">
            <div 
              className="h-full bg-gold transition-all duration-300"
              style={{ 
                width: `${((currentSlide + 1) / lookbookSlides.length) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-6 right-6 z-20 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white text-sm font-medium">
            {currentSlide + 1} / {lookbookSlides.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LookbookModal;