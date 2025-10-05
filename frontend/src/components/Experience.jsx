import React from 'react';
import { Briefcase, Calendar, CheckCircle, Building2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { experience, certifications } from '../data/mock';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Briefcase size={16} />
            Professional Experience
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Building AI Solutions
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              At Scale
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From AWS cloud platforms to cutting-edge ML models, my professional journey spans across 
            industry-leading companies where I've delivered impactful AI solutions.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Professional Journey
          </h3>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <Card key={exp.id} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {exp.title}
                        </CardTitle>
                        <CardDescription className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-1">
                          {exp.company}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline"
                      className="bg-green-100 text-green-800 border-green-300 font-semibold"
                    >
                      Experience #{index + 1}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Key Achievements:
                    </h4>
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start gap-3 group/item">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 group-hover/item:scale-110 transition-transform duration-200" />
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors duration-200">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Certifications & Credentials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
                <CardHeader className="relative z-10 pb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {cert.name}
                  </CardTitle>
                  <CardDescription className="text-blue-600 dark:text-blue-400 font-semibold">
                    {cert.issuer}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{cert.date}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {cert.credential}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to collaborate?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Let's discuss how my AI/ML expertise can contribute to your next innovative project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
                <ArrowRight size={16} />
              </a>
              <button
                onClick={() => {
                  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
                  window.open(`${BACKEND_URL}/api/resume/download`, '_blank');
                }}
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                Download Resume
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;