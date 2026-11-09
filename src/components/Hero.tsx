"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, FileText } from "lucide-react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";

const ROLES = [
	"Software Engineer",
	"Creative Builder",
	"Problem Solver",
	"CS @ CSULB",
];

const SOCIALS = [
	{ href: "https://github.com/lawrenceDegoma", label: "GitHub", icon: <Github size={18} aria-hidden /> },
	{ href: "https://www.linkedin.com/in/lawrencedegoma", label: "LinkedIn", icon: <Linkedin size={18} aria-hidden /> },
	{ href: "mailto:lawrencedegoma02@gmail.com", label: "Email", icon: <Mail size={18} aria-hidden /> },
];

export default function Hero() {
	const reduceMotion = useReducedMotion();
	const [roleIndex, setRoleIndex] = useState(0);
	const [displayed, setDisplayed] = useState("");
	const [deleting, setDeleting] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

	// Typewriter (static first role when the user prefers reduced motion)
	useEffect(() => {
		if (reduceMotion) {
			setDisplayed(ROLES[0]);
			return;
		}
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
	}, [displayed, deleting, roleIndex, reduceMotion]);

	// Particle canvas — desktop only, DPR-aware, paused when off-screen
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const desktop = window.matchMedia("(min-width: 768px)");
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
		const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
		let width = 0;
		let height = 0;
		let animId = 0;
		let visible = true;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = canvas.clientWidth;
			height = canvas.clientHeight;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const seed = () => {
			const count = width < 1024 ? 20 : 40;
			for (let i = 0; i < count; i++) {
				particles.push({
					x: Math.random() * width,
					y: Math.random() * height,
					vx: (Math.random() - 0.5) * 0.2,
					vy: (Math.random() - 0.5) * 0.2,
					size: Math.random() * 1.5 + 0.5,
					alpha: Math.random() * 0.35 + 0.08,
				});
			}
		};

		const paint = (move: boolean) => {
			ctx.clearRect(0, 0, width, height);
			for (const p of particles) {
				if (move) {
					p.x += p.vx;
					p.y += p.vy;
					if (p.x < 0 || p.x > width) p.vx *= -1;
					if (p.y < 0 || p.y > height) p.vy *= -1;
				}
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(234, 88, 12, ${p.alpha})`;
				ctx.fill();
			}
		};

		const loop = () => {
			paint(true);
			animId = requestAnimationFrame(loop);
		};

		const update = () => {
			cancelAnimationFrame(animId);
			if (!desktop.matches) return;
			resize();
			if (!particles.length) seed();
			if (reduce.matches) paint(false);
			else if (visible) animId = requestAnimationFrame(loop);
		};

		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			update();
		});
		observer.observe(canvas);
		window.addEventListener("resize", update);
		reduce.addEventListener("change", update);

		return () => {
			cancelAnimationFrame(animId);
			observer.disconnect();
			window.removeEventListener("resize", update);
			reduce.removeEventListener("change", update);
		};
	}, []);

	return (
		<section ref={containerRef} className="relative min-h-[100svh] flex items-center overflow-hidden">
			{/* Canvas — desktop only */}
			<canvas ref={canvasRef} aria-hidden className="absolute inset-0 z-0 w-full h-full hidden md:block" />

			{/* Gradient orbs — reduced on mobile */}
			<div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] md:w-[600px] md:h-[600px] bg-orange-600/8 rounded-full blur-[50px] md:blur-[140px] animate-float" />
				<div
					className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] md:w-[500px] md:h-[500px] bg-amber-600/6 rounded-full blur-[40px] md:blur-[120px] animate-float"
					style={{ animationDelay: "3s" }}
				/>
			</div>

			{/* Content stays in normal flow so it can never be clipped on short screens */}
			<motion.div style={{ opacity }} className="relative z-10 w-full px-6 pt-28 pb-24 lg:pt-32">
				<div className="mx-auto w-full max-w-6xl">
					<div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

						{/* Left: Text */}
						<div className="flex-1 text-center lg:text-left order-2 lg:order-1">
							<BlurFade delay={0.1}>
								<div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-md text-sm text-orange-300 mb-6">
									<span aria-hidden className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
									Available for opportunities
								</div>
							</BlurFade>

							{/* No entrance fade on the headline: it's the LCP element */}
							<h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-4">
								<span className="block text-white/90">Lawrence</span>
								<span className="block text-gradient">Degoma</span>
							</h1>

							<BlurFade delay={0.35}>
								<p className="sr-only">{ROLES.join(", ")}</p>
								<div
									aria-hidden
									className="text-xl lg:text-3xl text-white/60 mb-6 h-10 flex items-center justify-center lg:justify-start gap-1"
								>
									<span style={{ fontFamily: "var(--font-space-mono)" }}>{displayed}</span>
									<span className="w-0.5 h-7 bg-orange-400 animate-pulse ml-0.5" />
								</div>
							</BlurFade>

							<BlurFade delay={0.45}>
								<p className="text-base lg:text-lg text-white/60 max-w-xl leading-relaxed mb-8 mx-auto lg:mx-0">
									I&apos;m a CS student at CSULB who likes building things for the people around me: a parking app for my campus, an app for grinding LeetCode with friends, and a HUD I can control with my hands.
								</p>
							</BlurFade>

							<BlurFade delay={0.55}>
								<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap justify-center lg:justify-start">
									<div className="flex gap-3 justify-center lg:justify-start">
										<a
											href="#projects"
											className="group px-5 py-3 rounded-md font-semibold text-white relative overflow-hidden transition-all duration-300 hover:scale-105 text-sm"
											style={{ background: "linear-gradient(135deg, #ea580c, #f97316)" }}
										>
											<span aria-hidden className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
											View My Work
										</a>

										<a
											href="/LawrenceDegomaResume.pdf"
											target="_blank"
											rel="noopener noreferrer"
											className="group px-5 py-3 rounded-md font-semibold text-white/80 hover:text-white glass border border-white/10 hover:border-orange-500/50 flex items-center gap-2 transition-all duration-300 hover:scale-105 text-sm"
										>
											<FileText size={15} aria-hidden />
											Resume
										</a>
									</div>

									<div className="flex gap-3 justify-center lg:justify-start">
										{SOCIALS.map((link) => {
											const external = !link.href.startsWith("mailto:");
											return (
												<a
													key={link.label}
													href={link.href}
													aria-label={link.label}
													{...(external && { target: "_blank", rel: "noopener noreferrer" })}
													className="p-3 glass rounded-md text-white/55 hover:text-white border border-white/10 hover:border-orange-500/40 transition-all duration-300"
												>
													{link.icon}
												</a>
											);
										})}
									</div>
								</div>
							</BlurFade>
						</div>

						{/* Right: Photo — scales in but stays visible (no opacity: 0) so it never delays LCP */}
						<motion.div
							initial={{ scale: 0.92 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 80 }}
							className="flex-shrink-0 flex items-center justify-center order-1 lg:order-2"
						>
							<div className="relative">
								<div
									aria-hidden
									className="hidden md:block absolute -inset-4 rounded-full border border-dashed border-orange-500/30 animate-[spin_20s_linear_infinite]"
								/>
								<div
									aria-hidden
									className="hidden md:block absolute -inset-8 rounded-full border border-dotted border-amber-500/20 animate-[spin_15s_linear_infinite] [animation-direction:reverse]"
								/>
								<div aria-hidden className="absolute inset-0 rounded-full animate-pulse-glow" />
								<div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-orange-500/40">
									<Image
										src="/profile.webp"
										alt="Lawrence Degoma"
										fill
										sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, (max-width: 1024px) 288px, 320px"
										className="object-cover object-top"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent" />
								</div>

								<div className="absolute -bottom-4 -right-4 glass-strong rounded-md px-3 py-1.5 text-xs font-semibold text-white border border-white/10 md:animate-bob">
									🦈 SharkPark Founder
								</div>

								<div
									className="absolute -top-4 -left-4 glass-strong rounded-md px-3 py-1.5 text-xs font-semibold text-white border border-white/10 md:animate-bob"
									style={{ animationDelay: "-1.75s" }}
								>
									🌿 Branch Creator
								</div>
							</div>
						</motion.div>

					</div>
				</div>
			</motion.div>

			{/* Scroll indicator */}
			<motion.div
				aria-hidden
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5 }}
				className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
			>
				<span className="text-xs tracking-widest uppercase hidden md:block" style={{ fontFamily: "var(--font-space-mono)" }}>scroll</span>
				<ChevronDown size={16} className="animate-bounce" />
			</motion.div>
		</section>
	);
}
