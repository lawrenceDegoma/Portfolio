"use client";

import React, { useState } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';

const Projects = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: 'Cafédex Website',
      short: 'A cafe finder designed with creative inspiration from the Pokédex in Pokemon games.',
      details: 'Developed a responsive website for cafe recommendations in the greater LA, OC, and Pasadena without the use of frameworks.',
      link: 'https://lawrencedegoma.github.io/sea-Round2-Project/',
      tech: ['HTML', 'CSS', 'JavaScript'],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'HTML/CSS Parser',
      short: 'Custom built HTML and CSS renderer using SFML',
      details: 'This project parses and displays web pages using a tree structure for HTML and a map for CSS, showcasing an in-depth understanding of the architecture behind the languages along with experience with rendering engines.',
      link: 'https://github.com/lawrenceDegoma/HTML_Parser',
      tech: ['C++', 'SFML', 'Parsing'],
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      title: 'AI Voice Assistant',
      short: 'Voice assistant using Google Cloud and OpenAI APIs',
      details: 'Processes speech-to-text and returns AI generated responses using custom voices via Voice AI. Built for unique interactions and personalization.',
      tech: ['Python', 'Google Cloud', 'OpenAI'],
      gradient: 'from-green-500 to-teal-500'
    },
  ];

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="min-h-screen bg-slate-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Personal Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Exploring the intersection of creativity and technology through hands-on development
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm transition-all duration-500 hover:border-slate-600 ${
                openIndex === index ? 'shadow-2xl shadow-purple-500/10' : 'hover:shadow-xl hover:shadow-slate-900/20'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <button
                onClick={() => toggle(index)}
                className="w-full text-left p-6 flex justify-between items-start gap-4 relative z-10"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-4">
                    {project.short}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm bg-slate-700/50 text-purple-300 rounded-full border border-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <ChevronDown 
                  size={24} 
                  className={`text-gray-400 transition-all duration-300 ${
                    openIndex === index ? 'rotate-180 text-purple-400' : 'group-hover:text-white'
                  }`}
                />
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6 border-t border-slate-700/50">
                  <div className="pt-4">
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {project.details}
                    </p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        <span>View Project</span>
                        <ExternalLink size={16} />
                      </a>
                    )}
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
