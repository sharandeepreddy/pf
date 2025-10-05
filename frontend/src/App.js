import React, { useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import { Toaster } from './components/ui/toaster';

function App() {
  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="App">
      <div className="relative min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
        <Navigation />
        <Hero />
        <Projects />
        
        {/* Toaster for notifications */}
        <Toaster />
      </div>
    </div>
  );
}

export default App;