import React from 'react';
import { Badge } from './ui/badge';
import { projects } from '../data/mock';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Projects
        </h2>

        <div className="space-y-6">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full md:w-48 h-32 object-cover rounded"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <Badge variant="outline" className="ml-2">
                      {project.status}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary"
                        className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;