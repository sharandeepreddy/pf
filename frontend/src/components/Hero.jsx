import React, { useEffect, useRef } from 'react';
import { ChevronDown, Brain, Code, Database } from 'lucide-react';
import { Button } from './ui/button';
import { personalInfo } from '../data/mock';

const Hero = () => {
  const heroRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Simple particle animation
    const createParticles = () => {
      const container = heroRef.current;
      if (!container) return;

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(59, 130, 246, 0.5);
          border-radius: 50%;
          pointer-events: none;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
        `;
        container.appendChild(particle);
        particlesRef.current.push(particle);
      }
    };

    createParticles();

    return () => {
      particlesRef.current.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      particlesRef.current = [];
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      {/* Particles Container */}
      <div ref={heroRef} className="absolute inset-0 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Floating Icons */}
        <div className="absolute -top-20 left-10 animate-bounce">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
            <Brain className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="absolute -top-10 right-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
            <Code className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <div className="absolute top-20 right-10 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="w-14 h-14 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
            <Database className="w-7 h-7 text-green-400" />
          </div>
        </div>

        {/* Hero Text */}
        <div className="space-y-8">
          <div className="animate-fade-in-up">
            <p className="text-lg md:text-xl text-blue-400 font-medium mb-4">
              Hi, I'm
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Sharandeep Reddy
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Adla
              </span>
            </h1>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-green-300 dark:border-green-700">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              🟢 Available for Full-Time Roles | Graduating Dec 2025
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 mb-6">
              {personalInfo.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Connect
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button
          onClick={scrollToAbout}
          variant="ghost"
          size="icon"
          className="text-white/60 hover:text-white hover:bg-white/10 rounded-full"
        >
          <ChevronDown size={24} />
        </Button>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animate-gradient {
          animation: gradient 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
