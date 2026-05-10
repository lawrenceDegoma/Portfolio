"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";import { Github, Linkedin, Mail, ChevronDown, FileText } from "lucide-react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";

const ROLES = [
	"Software Engineer",
	"Creative Builder",
	"Problem Solver",
	"CS @ CSULB",
];

export default function Hero() {
	const [roleIndex, setRoleIndex] = useState(0);
	const [displayed, setDisplayed] = useState("");
	const [deleting, setDeleting] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: containerRef });
	const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

	// Typewriter effect
	useEffect(() => {
		const current = ROLES[roleIndex];
		let timeout: ReturnType<typeof setTimeout>;

		if (!deleting && displayed.length < current.length) {
			timeout = setTimeout(
				() => setDisplayed(current.slice(0, displayed.length + 1)),
				80
			);
		} else if (!deleting && displayed.length === current.length) {
			timeout = setTimeout(() => setDeleting(true), 2000);
		} else if (deleting && displayed.length > 0) {
			timeout = setTimeout(
				() => setDisplayed(current.slice(0, displayed.length - 1)),
				40
			);
		} else if (deleting && displayed.length === 0) {
			setDeleting(false);
			setRoleIndex((i) => (i + 1) % ROLES.length);
		}

		return () => clearTimeout(timeout);
	}, [displayed, deleting, roleIndex]);

	// Particle canvas
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const particles: {
			x: number;
			y: number;
			vx: number;
			vy: number;
			size: number;
			alpha: number;
		}[] = [];
		for (let i = 0; i < 40; i++) {
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

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", resize);
		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<section
			ref={containerRef}
			className="relative min-h-screen overflow-hidden"
		>
			{/* Background canvas */}
			<canvas
				ref={canvasRef}
				className="absolute inset-0 z-0 will-change-transform"
			/>

			{/* Gradient orbs */}
			<div className="absolute inset-0 z-0 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-600/8 rounded-full blur-[140px] animate-float" />
				<div
					className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-600/6 rounded-full blur-[120px] animate-float"
					style={{ animationDelay: "3s" }}
				/>
			</div>

			<motion.div
				style={{ opacity }}
				className="absolute inset-0 flex items-center justify-center px-6 pt-20"
			>
				<div className="w-full max-w-6xl">
					<div className="flex flex-col lg:flex-row items-center gap-16">
						{/* Left: Text */}
						<div className="flex-1 text-center lg:text-left">
							<BlurFade delay={0.1}>
								<div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-md text-sm text-orange-300 mb-8">
									<span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
									Available for opportunities
								</div>
							</BlurFade>

							<BlurFade delay={0.2}>
								<h1 className="text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-4">
									<span className="block text-white/90">Lawrence</span>
									<span className="block text-gradient">Degoma</span>
								</h1>
							</BlurFade>

							<BlurFade delay={0.35}>
								<div className="text-2xl lg:text-3xl text-white/60 mb-8 h-10 flex items-center justify-center lg:justify-start gap-1">
									<span style={{ fontFamily: "var(--font-space-mono)" }}>
										{displayed}
									</span>
									<span className="w-0.5 h-7 bg-orange-400 animate-pulse ml-0.5" />
								</div>
							</BlurFade>

							<BlurFade delay={0.45}>
								<p className="text-lg text-white/50 max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
									I build things that sit at the intersection of creativity and
									engineering — from innovative parking apps to hand-tracking HUDs.
									Always chasing the next idea.
								</p>
							</BlurFade>

							<BlurFade delay={0.55}>
								<div className="flex flex-wrap gap-4 justify-center lg:justify-start">
									<a
										href="#projects"
										className="group px-8 py-4 rounded-md font-semibold text-white relative overflow-hidden transition-all duration-300 hover:scale-105"
										style={{
											background: "linear-gradient(135deg, #ea580c, #f97316)",
										}}
									>
										<span className="relative z-10">View My Work</span>
										{/* shimmer sweep */}
										<span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
									</a>

									<a
										href="/LawrenceDegomaResume.pdf"
										target="_blank"
										rel="noopener noreferrer"
										className="group px-8 py-4 rounded-md font-semibold text-white/80 hover:text-white glass border border-white/10 hover:border-orange-500/50 flex items-center gap-2 transition-all duration-300 hover:scale-105"
									>
										<FileText size={18} />
										Resume
									</a>

									<div className="flex gap-3">
										{[
											{
												href: "https://github.com/lawrenceDegoma",
												icon: <Github size={20} />,
												color: "hover:border-orange-500",
											},
											{
												href: "https://www.linkedin.com/in/lawrencedegoma",
												icon: <Linkedin size={20} />,
												color: "hover:border-orange-400",
											},
											{
												href: "mailto:lawrencedegoma02@gmail.com",
												icon: <Mail size={20} />,
												color: "hover:border-amber-500",
											},
										].map((link, i) => (
											<a
												key={i}
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												className={`p-4 glass rounded-md text-white/60 hover:text-white border border-white/10 ${link.color} transition-all duration-300 hover:scale-110`}
											>
												{link.icon}
											</a>
										))}
									</div>
								</div>
							</BlurFade>
						</div>

						{/* Right: Profile photo with rings */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								duration: 0.8,
								delay: 0.3,
								type: "spring",
								stiffness: 80,
							}}
							className="flex-shrink-0 flex items-center justify-center"
						>
							<div className="relative">
								{/* Outer spinning ring */}
								<motion.div
									animate={{ rotate: 360 }}
									transition={{
										duration: 20,
										repeat: Infinity,
										ease: "linear",
									}}
									className="absolute -inset-4 rounded-full border border-dashed border-orange-500/30"
								/>
								{/* Second ring */}
								<motion.div
									animate={{ rotate: -360 }}
									transition={{
										duration: 15,
										repeat: Infinity,
										ease: "linear",
									}}
									className="absolute -inset-8 rounded-full border border-dotted border-amber-500/20"
								/>
								{/* Glow */}
								<div className="absolute inset-0 rounded-full animate-pulse-glow" />
								{/* Image */}
								<div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-orange-500/40">
									<Image
										src="/profile.webp"
										alt="Lawrence Degoma"
										fill
										className="object-cover object-top"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent" />
								</div>

								{/* Floating badges */}
								<motion.div
									animate={{ y: [-5, 5, -5] }}
									transition={{
										duration: 3,
										repeat: Infinity,
										ease: "easeInOut",
									}}
									className="absolute -bottom-4 -right-4 glass-strong rounded-md px-4 py-2 text-sm font-semibold text-white border border-white/10"
								>
									🦈 SharkPark Founder
								</motion.div>

								<motion.div
									animate={{ y: [5, -5, 5] }}
									transition={{
										duration: 3.5,
										repeat: Infinity,
										ease: "easeInOut",
									}}
									className="absolute -top-4 -left-4 glass-strong rounded-md px-4 py-2 text-sm font-semibold text-white border border-white/10"
								>
									✋ Hand Tracking HUD
								</motion.div>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.div>

			{/* Scroll indicator */}
			<motion.a
				href="#about"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5 }}
				className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group"
			>
				<span
					className="text-xs tracking-widest uppercase"
					style={{ fontFamily: "var(--font-space-mono)" }}
				>
					Scroll
				</span>
				<motion.div
					animate={{ y: [0, 8, 0] }}
					transition={{ duration: 1.5, repeat: Infinity }}
				>
					<ChevronDown size={20} />
				</motion.div>
			</motion.a>
		</section>
	);
}
