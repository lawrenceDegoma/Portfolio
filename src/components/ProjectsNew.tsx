"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Eye, X } from "lucide-react";

interface Project {
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  tech: string[];
  gradient: string;
  accent: string;
  link?: string;
  github?: string;
  preview?: string;
  featured?: boolean;
  category: string;
}

const PROJECTS: Project[] = [
  {
    title: "SharkPark",
    emoji: "🦈",
    tagline: "Shark conservation meets social tech",
    description:
      "SharkPark is a full-stack conservation application that allows users to track, log, and share shark sightings in real time. Built to raise awareness about endangered shark species, it combines geolocation, community reporting, and educational content into one intuitive platform.",
    tech: ["React", "Node.js", "Firebase", "Maps API", "Tailwind"],
    gradient: "from-blue-700 via-cyan-600 to-teal-500",
    accent: "cyan",
    featured: true,
    category: "Full-Stack App",
    link: "https://github.com/lawrenceDegoma",
    github: "https://github.com/lawrenceDegoma",
  },
  {
    title: "Hand Tracking HUD",
    emoji: "✋",
    tagline: "Gesture-controlled heads-up display",
    description:
      "A real-time hand tracking HUD powered by computer vision. Using OpenCV and MediaPipe, this tool detects hand gestures and maps them to interface controls — think Iron Man's UI but in Python. Built as an exploration of human-computer interaction.",
    tech: ["Python", "OpenCV", "MediaPipe", "NumPy"],
    gradient: "from-orange-700 via-amber-600 to-yellow-500",
    accent: "orange",
    featured: true,
    category: "Computer Vision",
    github: "https://github.com/lawrenceDegoma",
  },
  {
    title: "Bartender Ordering System",
    emoji: "🍹",
    tagline: "Real-time drink ordering for 30+ guests",
    description:
      "Engineered a real-time web app to streamline party drink orders. Guests submit orders from their phones, which queue up live on an iPad interface for the bartender — eliminating chaos, cutting wait times, and genuinely making a party run smoother.",
    tech: ["React", "Tailwind", "Firebase"],
    gradient: "from-rose-700 via-pink-600 to-fuchsia-500",
    accent: "rose",
    featured: false,
    category: "Real-Time App",
    link: "https://biggiesbar.vercel.app/",
    github: "https://github.com/lawrenceDegoma",
    preview: "https://biggiesbar.vercel.app/",
  },
  {
    title: "HTML/CSS Parser",
    emoji: "🧠",
    tagline: "Custom browser engine built from scratch",
    description:
      "Built a working HTML/CSS renderer using SFML — parsing markup into a DOM tree and styling rules into a cascade map, then rendering it all visually. This project gave me a deep understanding of how browsers actually work under the hood.",
    tech: ["C++", "SFML", "Parsing", "Data Structures"],
    gradient: "from-slate-700 via-zinc-600 to-stone-500",
    accent: "zinc",
    featured: false,
    category: "Systems",
    github: "https://github.com/lawrenceDegoma/HTML_Parser",
  },
  {
    title: "AI Voice Assistant",
    emoji: "🤖",
    tagline: "Speech-to-response with custom voices",
    description:
      "A Python-powered voice assistant using Google Cloud STT, OpenAI GPT, and a Voice AI layer for custom voice synthesis. Built for unique character-driven interactions — you choose the persona, it responds in character.",
    tech: ["Python", "Google Cloud", "OpenAI", "Voice AI"],
    gradient: "from-emerald-700 via-teal-600 to-cyan-500",
    accent: "teal",
    featured: false,
    category: "AI / ML",
  },
  {
    title: "Cafédex",
    emoji: "☕",
    tagline: "Pokédex-inspired cafe finder for LA",
    description:
      "A Pokédex-inspired cafe recommendation site for the greater LA area — built entirely without frameworks. Custom HTML, CSS, and vanilla JS. An exercise in creativity, constraint, and really caring about the craft.",
    tech: ["HTML", "CSS", "JavaScript"],
    gradient: "from-amber-700 via-orange-600 to-red-500",
    accent: "amber",
    featured: false,
    category: "Web",
    link: "https://lawrencedegoma.github.io/sea-Round2-Project/",
    preview: "https://lawrencedegoma.github.io/sea-Round2-Project/",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" ref={ref} className="py-32 px-6 relative">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(234,88,12,1) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-orange-500 text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-space-mono)" }}>// what i've built</p>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Real problems, real solutions. Each project taught me something new about engineering, design, and humans.
          </p>
        </motion.div>

        {/* Featured projects (large) */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {PROJECTS.filter((p) => p.featured).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onClick={() => setSelected(project)}
              className="group relative glass rounded-xl overflow-hidden cursor-pointer hover:scale-[1.01] transition-all duration-500"
            >
              {/* Gradient header */}
              <div className={`h-44 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-6 text-6xl">{project.emoji}</div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 glass rounded-md text-xs text-white/80" style={{ fontFamily: "var(--font-space-mono)" }}>
                    {project.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
                  {project.title}
                </h3>
                <p className="text-white/40 text-sm font-medium mb-4">{project.tagline}</p>
                <p className="text-white/60 leading-relaxed text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 glass rounded-md text-xs text-white/50" style={{ fontFamily: "var(--font-space-mono)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-orange-400 group-hover:text-orange-300 font-semibold flex items-center gap-1.5 transition-colors">
                    <Eye size={14} /> Learn more
                  </span>
                  <div className="flex gap-2 ml-auto">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 glass rounded-md text-white/40 hover:text-white transition-colors"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 glass rounded-md text-white/40 hover:text-white transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other projects (smaller grid) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS.filter((p) => !p.featured).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              onClick={() => setSelected(project)}
              className="group glass rounded-lg p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:border-orange-500/30"
            >
              <div className="text-4xl mb-4">{project.emoji}</div>
              <div className="text-xs text-white/30 uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-space-mono)" }}>{project.category}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{project.tagline}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 glass rounded-md text-xs text-white/40" style={{ fontFamily: "var(--font-space-mono)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="relative max-w-2xl w-full glass-strong rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-48 bg-gradient-to-br ${selected.gradient} relative`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-8 text-7xl">{selected.emoji}</div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 glass rounded-md text-white/70 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-8">
              <div className="text-xs text-white/30 uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-space-mono)" }}>{selected.category}</div>
              <h3 className="text-3xl font-black text-white mb-2">{selected.title}</h3>
              <p className="text-orange-400 font-medium mb-6">{selected.tagline}</p>
              <p className="text-white/70 leading-relaxed mb-8">{selected.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {selected.tech.map((t) => (
                  <span key={t} className="px-3 py-1.5 glass rounded-md text-sm text-white/60" style={{ fontFamily: "var(--font-space-mono)" }}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {selected.github && (
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 glass rounded-md text-white/70 hover:text-white font-semibold text-sm transition-all"
                  >
                    <Github size={16} /> GitHub
                  </a>
                )}
                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-md text-white font-semibold text-sm transition-all"
                    style={{ background: "linear-gradient(135deg, #ea580c, #f97316)" }}
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
