import React from 'react';
import { Github, Linkedin, Mail, Code, Palette, Zap } from 'lucide-react';
import Image from "next/image"; 

const AboutMe = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Section */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-48 h-48 bg-slate-800 rounded-full overflow-hidden border-4 border-slate-700">
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                  <Image
                    src="/profile.jpg"
                    alt="LD"
                    width={200}
                    height={200}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mt-6 text-white text-center lg:text-left bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Lawrence Degoma
            </h1>
            
            <div className="flex items-center gap-2 mt-4 text-purple-300 text-lg">
              <Code size={20} />
              <span>Software Engineer</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 mt-6">
              <a
                href="https://github.com/lawrenceDegoma"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-gray-300 hover:text-white hover:border-purple-500 hover:bg-slate-800 transition-all duration-300 transform hover:scale-105"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/lawrencedegoma"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-gray-300 hover:text-white hover:border-blue-500 hover:bg-slate-800 transition-all duration-300 transform hover:scale-105"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:lawrencedegoma02@gmail.com"
                className="p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-gray-300 hover:text-white hover:border-teal-500 hover:bg-slate-800 transition-all duration-300 transform hover:scale-105"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* About Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block">
              <h2 className="text-4xl font-bold text-white mb-2 relative">
                About Me
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </h2>
            </div>
            
            <p className="text-xl text-gray-300 mt-8 leading-relaxed max-w-2xl">
              Hi, I'm Lawrence! I'm an aspiring software engineer completing my undergrad at
              the California State University of Long Beach. My professional objective is to
              secure a position within an innovative company that wants to change the world as
              much as I do.
            </p>
            
            <p className="text-xl text-gray-300 mt-6 leading-relaxed max-w-2xl">
              My passion lies in building tools that bridge creativity and
              technology. I'm always on the hunt to learn new things and build new projects
              and I welcome any opportunities that present themselves!
            </p>

            {/* Skills highlights */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-purple-300">
                <Palette size={16} />
                <span>Creative</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-blue-300">
                <Code size={16} />
                <span>Technical</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-teal-300">
                <Zap size={16} />
                <span>Innovative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
