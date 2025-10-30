import React from 'react';
import { GraduationCap, MapPin, Calendar, Award, User2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { personalInfo, education, skills } from '../data/mock';

const About = () => {
  const skillCategories = Object.entries(skills).map(([name, skillList]) => ({
    name,
    skills: skillList,
    color: name === 'ML/AI' ? 'bg-purple-100 text-purple-800 border-purple-300' :
           name === 'Data Science' ? 'bg-blue-100 text-blue-800 border-blue-300' :
           name === 'Web Dev' ? 'bg-green-100 text-green-800 border-green-300' :
           name === 'Cloud/DevOps' ? 'bg-orange-100 text-orange-800 border-orange-300' :
           'bg-gray-100 text-gray-800 border-gray-300'
  }));

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <User2 size={16} />
            About Me
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Passionate About
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI & Innovation
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {personalInfo.bio}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Info Card */}
          <Card className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-slate-800/50 dark:to-slate-700/50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <User2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{personalInfo.name}</p>
                  <p className="text-gray-600 dark:text-gray-300">{personalInfo.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Location</p>
                  <p className="text-gray-600 dark:text-gray-300">{personalInfo.location}</p>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Currently pursuing Master's in Data Science at University at Buffalo, with hands-on experience 
                  in machine learning, deep learning, and AI model deployment. Passionate about creating 
                  intelligent solutions that make a real-world impact.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Education Timeline Card */}
          <Card className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-slate-800/50 dark:to-slate-700/50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-purple-600" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={edu.id} className="relative">
                    {/* Timeline Line */}
                    {index !== education.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-purple-300 to-blue-300 dark:from-purple-600 dark:to-blue-600"></div>
                    )}
                    
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        edu.status === 'current' 
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                          : 'bg-gradient-to-r from-gray-400 to-gray-500'
                      }`}>
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <h3 className="font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                          <Badge 
                            variant={edu.status === 'current' ? 'default' : 'secondary'}
                            className={edu.status === 'current' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                          >
                            {edu.status === 'current' ? 'In Progress' : 'Completed'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 font-medium">{edu.institution}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            {edu.duration}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Award className="w-4 h-4 text-yellow-500" />
                            <span className="font-semibold text-gray-700 dark:text-gray-300">{edu.gpa}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Technical Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category) => (
              <Card key={category.name} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge 
                        key={skill}
                        variant="outline"
                        className={`${category.color} hover:scale-105 transition-transform duration-200 cursor-default`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-8 md:p-12 mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Key Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">📝</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">Published Researcher</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">ICOTET 2024</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">📈</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">20% Accuracy Boost</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">ML Model Improvement</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">🎯</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">98% CNN Accuracy</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Deep Learning Project</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">📊</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">30% Speed Boost</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Optimized Inference</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">🏆</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">A+ Grade</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Predictive Analytics</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">☁️</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">AWS Certified</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">ML & Cloud</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">🎓</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">GPA: 3.704</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">University at Buffalo</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-red-600 dark:text-red-400">🟢</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">May 2026</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Graduating</div>
            </div>
          </div>
        </div>

        {/* Beyond the Code */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Beyond the Code
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">500+</div>
              <div className="text-gray-700 dark:text-gray-300">Members Managed in SQL System</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">12%</div>
              <div className="text-gray-700 dark:text-gray-300">Performance Improvement (CNN vs DNN)</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">9</div>
              <div className="text-gray-700 dark:text-gray-300">Professional Certifications</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;