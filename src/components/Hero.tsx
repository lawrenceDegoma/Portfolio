"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, FileText } from "lucide-react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { useIsMobile } from "@/hooks/useIsMobile";

const ROLES = [
	"Software Engineer",
	"Creative Builder",
	"Problem Solver",
	"CS @ CSULB",
];

export default function Hero() {
	const isMobile = useIsMobile();
	const [roleIndex, setRoleIndex] = useState(0);
	const [displayed, setDisplayed] = useState("");
	const [deleting, setDeleting] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

	// Typewriter
	useEffect(() => {
		const current = ROLES[roleIndex];
		let timeout: ReturnType<typeof setTimeout>;
		if (!deleting && displayed.length < current.length) {
			timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
		} else if (!deleting && displayed.length === current.length) {
			timeout = setTimeout(() => setDeleting(true), 2000);
		} else if (deleting && displayed.length > 0) {
			timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
		} else if (deleting && displayed.length === 0) {
			setDeleting(false);
			setRoleIndex((i) => (i + 1) % ROLES.length);
		}
		return () => clearTimeout(timeout);
	}, [displayed, deleting, roleIndex]);

	// Canvas — desktop only
	useEffect(() => {
		if (typeof window === "undefined" || window.innerWidth < 768) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resize();
		window.addEventListener("resize", resize);

		const PARTICLE_COUNT = window.innerWidth < 1024 ? 20 : 40;
		const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 0.2,
				vy: (Math.random() - 0.5) * 0.2,
				size: Math.random() * 1.5 + 0.5,
				alpha: Math.random() * 0.35 + 0.08,
			});
		}

		let animId: number;
		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			particles.forEach((p) => {
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
				if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(234, 88, 12, ${p.alpha})`;
				ctx.fill();
			});
			animId = requestAnimationFrame(draw);
		};
		draw();

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<section ref={containerRef} className="relative min-h-screen overflow-hidden">
			{/* Canvas — desktop only */}
			<canvas ref={canvasRef} className="absolute inset-0 z-0 will-change-transform hidden md:block" />

			{/* Gradient orbs — reduced on mobile */}
			<div className="absolute inset-0 z-0 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] md:w-[600px] md:h-[600px] bg-orange-600/8 rounded-full blur-[50px] md:blur-[140px] animate-float" />
				<div
					className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] md:w-[500px] md:h-[500px] bg-amber-600/6 rounded-full blur-[40px] md:blur-[120px] animate-float"
					style={{ animationDelay: "3s" }}
				/>
			</div>

			<motion.div
				style={{ opacity }}
				className="absolute inset-0 flex items-center justify-center px-6 pt-20"
			>
				<div className="w-full max-w-6xl">
					<div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

						{/* Left: Text */}
						<div className="flex-1 text-center lg:text-left order-2 lg:order-1">
							<BlurFade delay={0.1}>
								<div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-md text-sm text-orange-300 mb-6">
									<span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
									Available for opportunities
								</div>
							</BlurFade>

							<BlurFade delay={0.2}>
								<h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-4">
									<span className="block text-white/90">Lawrence</span>
									<span className="block text-gradient">Degoma</span>
								</h1>
							</BlurFade>

							<BlurFade delay={0.35}>
								<div className="text-xl lg:text-3xl text-white/60 mb-6 h-10 flex items-center justify-center lg:justify-start gap-1">
									<span style={{ fontFamily: "var(--font-space-mono)" }}>{displayed}</span>
									<span className="w-0.5 h-7 bg-orange-400 animate-pulse ml-0.5" />
								</div>
							</BlurFade>

							<BlurFade delay={0.45}>
								<p className="text-base lg:text-lg text-white/50 max-w-xl leading-relaxed mb-8 mx-auto lg:mx-0">
									I build real tools that solve real problems — from crowdsourced parking apps to computer vision HUDs. CS student at CSULB who ships things.
								</p>
							</BlurFade>

							<BlurFade delay={0.55}>
								<div className="flex flex-wrap gap-3 justify-center lg:justify-start">
									<a
										href="#projects"
										className="group px-6 py-3 rounded-md font-semibold text-white relative overflow-hidden transition-all duration-300 hover:scale-105 text-sm lg:text-base"
										style={{ background: "linear-gradient(135deg, #ea580c, #f97316)" }}
									>
										<span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
										View My Work
									</a>

									<a
										href="/LawrenceDegomaResume.pdf"
										target="_blank"
										rel="noopener noreferrer"
										className="group px-6 py-3 rounded-md font-semibold text-white/80 hover:text-white glass border border-white/10 hover:border-orange-500/50 flex items-center gap-2 transition-all duration-300 hover:scale-105 text-sm lg:text-base"
									>
										<FileText size={16} />
										Resume
									</a>

									<div className="flex gap-3">
										{[
											{ href: "https://github.com/lawrenceDegoma", icon: <Github size={18} /> },
											{ href: "https://www.linkedin.com/in/lawrencedegoma", icon: <Linkedin size={18} /> },
											{ href: "mailto:lawrencedegoma02@gmail.com", icon: <Mail size={18} /> },
										].map((link, i) => (
											<a
												key={i}
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												className="p-2.5 glass rounded-md text-white/40 hover:text-white border border-white/10 hover:border-orange-500/40 transition-all duration-300"
											>
												{link.icon}
											</a>
										))}
									</div>
								</div>
							</BlurFade>
						</div>

						{/* Right: Photo */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 80 }}
							className="flex-shrink-0 flex items-center justify-center order-1 lg:order-2"
						>
							<div className="relative">
								{!isMobile && (
									<>
										<motion.div
											animate={{ rotate: 360 }}
											transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
											className="absolute -inset-4 rounded-full border border-dashed border-orange-500/30"
										/>
										<motion.div
											animate={{ rotate: -360 }}
											transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
											className="absolute -inset-8 rounded-full border border-dotted border-amber-500/20"
										/>
									</>
								)}
								<div className="absolute inset-0 rounded-full animate-pulse-glow" />
								<div className="relative w-52 h-52 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-orange-500/40">
									<Image
										src="/profile.webp"
										alt="Lawrence Degoma"
										fill
										sizes="(max-width: 768px) 208px, (max-width: 1024px) 288px, 320px"
										className="object-cover object-top"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent" />
								</div>

								<motion.div
									animate={isMobile ? {} : { y: [-5, 5, -5] }}
									transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
									className="absolute -bottom-4 -right-4 glass-strong rounded-md px-3 py-1.5 text-xs font-semibold text-white border border-white/10"
								>
									🦈 SharkPark Founder
								</motion.div>

								<motion.div
									animate={isMobile ? {} : { y: [5, -5, 5] }}
									transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
									className="absolute -top-4 -left-4 glass-strong rounded-md px-3 py-1.5 text-xs font-semibold text-white border border-white/10"
								>
									✋ Hand Tracking HUD
								</motion.div>
							</div>
						</motion.div>

					</div>
				</div>
			</motion.div>

			{/* Scroll indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5 }}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
			>
				<span className="text-xs tracking-widest uppercase hidden md:block" style={{ fontFamily: "var(--font-space-mono)" }}>scroll</span>
				<ChevronDown size={16} className="animate-bounce" />
			</motion.div>
		</section>
	);
}
