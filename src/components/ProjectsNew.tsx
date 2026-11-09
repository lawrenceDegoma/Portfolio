"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Eye, X } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import Image from "next/image";

interface Project {
  title: string;
  emoji: string;
  image?: string;
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
    image: "/SharkParkV4.webp",
    tagline: "Crowdsourced campus parking for CSULB commuters",
    description:
      "SharkPark is a real-time parking availability system for CSULB — a campus with 28 lots and a daily commuter parking nightmare. Every user's phone becomes an anonymous sensor: when it enters or exits a lot's geofence, the backend aggregates those events into a live occupancy estimate. No personal location data stored, ever. Features include live lot occupancy, short and long-term forecasts, smart recommendations, event-aware alerts, and a live shuttle tracker.",
    tech: ["React Native", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Azure AD SSO", "Fly.io", "Turborepo", "Cloudflare R2"],
    gradient: "from-blue-700 via-cyan-600 to-teal-500",
    accent: "cyan",
    featured: true,
    category: "Mobile App",
    link: "https://sharkpark.app",
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
    github: "https://github.com/lawrenceDegoma/HandTrackerHUD",
  },
    {
    title: "Portable Photobooth",
    emoji: "🧠",
    tagline: "A portable, all-in-one photobooth powered by Raspberry Pi",
    description:
      "A self-contained, portable photobooth built around a Raspberry Pi 3 model B+, Raspberry Pi Camera Module, touchscreen display, and integrated lighting.",
    tech: ["Python", "Raspberry Pi OS", "PIL", "Picamera2"],
    gradient: "from-slate-700 via-zinc-600 to-stone-500",
    accent: "zinc",
    featured: false,
    category: "Systems",
    github: "https://github.com/lawrenceDegoma/Photobooth",
  },
  {
    title: "RateMyProf for GCC",
    emoji: "⭐",
    image: "/logo.png",
    tagline: "RateMyProfessors ratings injected into GCC's course catalog",
    description:
      "A published Chrome extension that injects RateMyProfessors ratings and reviews directly into Glendale Community College's class search page — no tab switching needed. Color-coded rating badges appear next to every professor's name on page load, with hover cards showing quality score, difficulty, 'would retake' %, and recent reviews. Built with a MV3 service worker querying the RMP GraphQL API, a MutationObserver to handle PeopleSoft's dynamic AJAX loading, and in-memory caching to keep things fast.",
    tech: ["JavaScript", "Chrome Extensions", "GraphQL", "MutationObserver", "CSS"],
    gradient: "from-emerald-700 via-teal-600 to-cyan-500",
    accent: "teal",
    featured: false,
    category: "Browser Extension",
    github: "https://github.com/lawrenceDegoma/GCC_RatemyProf_Extension",
    link: "https://chromewebstore.google.com/detail/ratemyprof-for-gcc/ppnijakoikpoepilpldnbfgdjemhlnca",
  },
  {
    title: "MacMultipeer",
    emoji: "☕",
    tagline: "Cross-platform multipeer connectivity app",
    description:
      "Cross-platform multipeer connectivity app enabling StreamDeck-like control for seamless screen sharing and input switching between Mac, iPhone, and iPad devices using Apple's MultipeerConnectivity framework.",  
    tech: ["Swift", "iOS", "macOS", "iPadOS"],
    gradient: "from-amber-700 via-orange-600 to-red-500",
    accent: "amber",
    featured: false,
    category: "Systems",
    github: "https://github.com/lawrenceDegoma/MacMultipeer",
  },
  {
    title: "Bartender Ordering System",
    emoji: "🍹",
    image: "/lawandpour.png",
    tagline: "Real-time drink ordering for 30+ guests",
    description:
      "Engineered a real-time web app to streamline party drink orders. Guests submit orders from their phones, which queue up live on an iPad interface for the bartender — eliminating chaos, cutting wait times, and genuinely making a party run smoother.",
    tech: ["React", "Tailwind", "Firebase"],
    gradient: "from-rose-700 via-pink-600 to-fuchsia-500",
    accent: "rose",
    featured: false,
    category: "Real-Time App",
    link: "https://lawandpour-khaki.vercel.app/",
    preview: "https://lawandpour-khaki.vercel.app/",
  },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex gap-2 ml-auto">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="relative z-10 p-3 glass rounded-md text-white/55 hover:text-white transition-colors"
        >
          <Github size={16} aria-hidden />
        </a>
      )}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title}`}
          className="relative z-10 p-3 glass rounded-md text-white/55 hover:text-white transition-colors"
        >
          <ExternalLink size={16} aria-hidden />
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // While the modal is open: lock page scroll, focus the close button,
  // close on Escape, keep Tab inside the dialog, restore focus on close.
  useEffect(() => {
    if (!selected) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [selected]);

  return (
    <section id="projects" className="py-32 px-6 relative">
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(234,88,12,1) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <BlurFade delay={0} inView className="text-center mb-20">
          <p className="text-orange-500 text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-space-mono)" }}>// what i&apos;ve built</p>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Real problems, real solutions. Each project taught me something new about engineering, design, and humans.
          </p>
        </BlurFade>

        {/* Featured projects (large). The title button stretches over the whole
            card via ::after, so the card is keyboard-accessible without nesting
            the GitHub/link anchors inside a button. */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {PROJECTS.filter((p) => p.featured).map((project, i) => (
            <BlurFade key={project.title} delay={0.1 + i * 0.15} inView>
              <div className="group relative glass rounded-xl overflow-hidden hover:scale-[1.01] transition-all duration-500 has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-orange-500">
              {/* Gradient header */}
              <div className={`h-44 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                {project.image ? (
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className={project.image.includes("logo") || project.image.includes("icon") ? "object-contain p-6" : "object-cover object-top"}
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                ) : (
                  <div aria-hidden className="absolute bottom-4 left-6 w-14 h-14 rounded-md bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-white/60 text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-space-mono)" }}>
                    {project.category.slice(0, 3)}
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 glass rounded-md text-xs text-white/80" style={{ fontFamily: "var(--font-space-mono)" }}>
                    {project.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    className="text-left cursor-pointer focus-visible:outline-none after:absolute after:inset-0"
                  >
                    {project.title}
                  </button>
                </h3>
                <p className="text-white/55 text-sm font-medium mb-4">{project.tagline}</p>
                <p className="text-white/60 leading-relaxed text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 glass rounded-md text-xs text-white/60" style={{ fontFamily: "var(--font-space-mono)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span aria-hidden className="text-sm text-orange-400 group-hover:text-orange-300 font-semibold flex items-center gap-1.5 transition-colors">
                    <Eye size={14} /> Learn more
                  </span>
                  <ProjectLinks project={project} />
                </div>
              </div>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Other projects (smaller grid) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS.filter((p) => !p.featured).map((project, i) => (
            <BlurFade key={project.title} delay={0.2 + i * 0.1} inView className="h-full">
              <div className="group relative h-full glass rounded-lg p-6 hover:scale-[1.02] transition-all duration-300 hover:border-orange-500/30 has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-orange-500">
              <div className="mb-4">
                {project.image ? (
                  <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white/5">
                    <Image src={project.image} alt="" fill className="object-contain p-1.5" sizes="48px" />
                  </div>
                ) : (
                  <div aria-hidden className="w-12 h-12 rounded-md bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center text-orange-400 text-xs font-bold" style={{ fontFamily: "var(--font-space-mono)" }}>
                    {project.category.slice(0, 3).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="text-xs text-white/55 uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-space-mono)" }}>{project.category}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  className="text-left cursor-pointer focus-visible:outline-none after:absolute after:inset-0"
                >
                  {project.title}
                </button>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">{project.tagline}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 glass rounded-md text-xs text-white/55" style={{ fontFamily: "var(--font-space-mono)" }}>
                    {t}
                  </span>
                ))}
              </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Modal — bottom sheet on phones, centered card from sm up. The panel is
          capped at 90dvh and scrolls internally; the close button sits outside
          the scroll area so it's always reachable. */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
            onClick={() => setSelected(null)}
          >
            <div aria-hidden className="absolute inset-0 bg-black/70 backdrop-blur-xl" />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 160, damping: 22 }}
              className="relative w-full sm:max-w-2xl max-h-[90dvh] flex flex-col glass-strong rounded-t-xl sm:rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeRef}
                type="button"
                aria-label="Close project details"
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 p-3 glass-strong rounded-md text-white/80 hover:text-white transition-colors"
              >
                <X size={18} aria-hidden />
              </button>

              <div className="overflow-y-auto overscroll-contain">
                <div className={`h-40 sm:h-48 bg-gradient-to-br ${selected.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  {selected.image && (
                    <Image
                      src={selected.image}
                      alt=""
                      fill
                      className={selected.image.includes("logo") || selected.image.includes("icon") ? "object-contain p-10" : "object-cover object-top"}
                      sizes="(max-width: 672px) 100vw, 672px"
                    />
                  )}
                </div>
                <div className="p-6 sm:p-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-8">
                  <div className="text-xs text-white/55 uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-space-mono)" }}>{selected.category}</div>
                  <h3 id="project-modal-title" className="text-3xl font-black text-white mb-2">{selected.title}</h3>
                  <p className="text-orange-400 font-medium mb-6">{selected.tagline}</p>
                  <p className="text-white/70 leading-relaxed mb-8">{selected.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selected.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 glass rounded-md text-sm text-white/60" style={{ fontFamily: "var(--font-space-mono)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selected.github && (
                      <a
                        href={selected.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 glass rounded-md text-white/70 hover:text-white font-semibold text-sm transition-all"
                      >
                        <Github size={16} aria-hidden /> GitHub
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
                        <ExternalLink size={16} aria-hidden /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
