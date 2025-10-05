import React from 'react';
import { Github, Linkedin, Mail, Heart, Code2, Database, Brain } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: personalInfo.github,
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn', 
      icon: Linkedin,
      url: personalInfo.linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:${personalInfo.email}`,
      color: 'hover:text-purple-400'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const techStack = [
    { name: 'AI/ML', icon: Brain, color: 'text-purple-400' },
    { name: 'Full Stack', icon: Code2, color: 'text-blue-400' },
    { name: 'Data Science', icon: Database, color: 'text-green-400' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {personalInfo.name}
              </h3>
              <p className="text-gray-300 text-lg font-medium mb-4">
                {personalInfo.title}
              </p>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Passionate about building intelligent solutions that bridge the gap between 
                complex AI/ML concepts and real-world applications. Always learning, 
                always building.
              </p>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {techStack.map((tech) => (
                <div 
                  key={tech.name}
                  className="flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-full border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                >
                  <tech.icon size={16} className={tech.color} />
                  <span className="text-sm text-gray-300">{tech.name}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700`}
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <div className="text-gray-400">
                <p className="text-sm font-medium text-gray-300 mb-1">Location</p>
                <p>{personalInfo.location}</p>
              </div>
              <div className="text-gray-400">
                <p className="text-sm font-medium text-gray-300 mb-1">Email</p>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="text-gray-400">
                <p className="text-sm font-medium text-gray-300 mb-1">Phone</p>
                <a 
                  href={`tel:${personalInfo.phone}`}
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  {personalInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span>&copy; {currentYear} {personalInfo.name}. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span>Built with</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>using React & AI</span>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;