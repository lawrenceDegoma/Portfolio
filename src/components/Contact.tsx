"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";

const LINKS = [
	{
		icon: <Github size={22} />,
		label: "GitHub",
		sublabel: "@lawrenceDegoma",
		href: "https://github.com/lawrenceDegoma",
		color: "hover:border-orange-500/50",
		gradient: "from-zinc-600 to-stone-700",
	},
	{
		icon: <Linkedin size={22} />,
		label: "LinkedIn",
		sublabel: "lawrencedegoma",
		href: "https://www.linkedin.com/in/lawrencedegoma",
		color: "hover:border-orange-400/50",
		gradient: "from-blue-600 to-blue-800",
	},
	{
		icon: <Mail size={22} />,
		label: "Email",
		sublabel: "lawrencedegoma02@gmail.com",
		href: "mailto:lawrencedegoma02@gmail.com",
		color: "hover:border-amber-500/50",
		gradient: "from-orange-600 to-amber-700",
	},
];

export default function Contact() {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section
			id="contact"
			ref={ref}
			className="py-32 px-6 relative overflow-hidden"
		>
			{/* Background */}
			<div className="absolute inset-0 z-0">
				<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-600/6 rounded-full blur-[120px]" />
			</div>

			<div className="max-w-4xl mx-auto relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7 }}
					className="text-center mb-16"
				>
					<p
						className="text-orange-500 text-sm tracking-widest uppercase mb-4"
						style={{ fontFamily: "var(--font-space-mono)" }}
					>
						// let's connect
					</p>
					<h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
						Let's Build
						<br />
						<span className="text-gradient">Something Great</span>
					</h2>
					<p className="text-xl text-white/50 max-w-xl mx-auto leading-relaxed">
						Whether you're looking to hire, collaborate, or just want to talk
						about sharks — my inbox is always open.
					</p>
				</motion.div>

				{/* Big CTA */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={inView ? { opacity: 1, scale: 1 } : {}}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="glass rounded-xl p-10 mb-8 text-center relative overflow-hidden"
				>
					<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5" />
					<div className="relative">
						<div className="text-5xl mb-6">👋</div>
						<h3 className="text-2xl font-bold text-white mb-4">
							Open to Opportunities
						</h3>
						<p className="text-white/50 mb-8 max-w-md mx-auto">
							I'm actively looking for full-time software engineering roles where
							I can contribute, learn, and build things I'm proud of.
						</p>
						<a
							href="mailto:lawrencedegoma02@gmail.com"
							className="inline-flex items-center gap-3 px-8 py-4 rounded-md font-bold text-white text-lg transition-all duration-300 hover:scale-105 group"
							style={{
								background: "linear-gradient(135deg, #ea580c, #f97316)",
							}}
						>
							<Send
								size={18}
								className="group-hover:translate-x-1 transition-transform"
							/>
							Say Hello
						</a>
					</div>
				</motion.div>

				{/* Social links */}
				<div className="grid sm:grid-cols-3 gap-4 mb-16">
					{LINKS.map((link, i) => (
						<motion.a
							key={i}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
							className={`glass rounded-lg p-6 flex items-center gap-4 border border-white/5 ${link.color} hover:scale-[1.02] transition-all duration-300 group`}
						>
							<div
								className={`p-3 rounded-md bg-gradient-to-br ${link.gradient} text-white flex-shrink-0`}
							>
								{link.icon}
							</div>
							<div>
								<div className="font-bold text-white group-hover:text-orange-300 transition-colors">
									{link.label}
								</div>
								<div className="text-white/40 text-xs mt-0.5 truncate">
									{link.sublabel}
								</div>
							</div>
						</motion.a>
					))}
				</div>

				{/* Footer */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={inView ? { opacity: 1 } : {}}
					transition={{ delay: 0.6 }}
					className="text-center"
				>
					<div className="w-20 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mb-6" />
					<p
						className="text-white/20 text-sm"
						style={{ fontFamily: "var(--font-space-mono)" }}
					>
						Designed & Built by{" "}
						<span className="text-orange-500/60">Lawrence Degoma</span> — 2025
					</p>
					<p
						className="text-white/10 text-xs mt-2"
						style={{ fontFamily: "var(--font-space-mono)" }}
					>
						Built with Next.js, Tailwind CSS, Framer Motion
					</p>
				</motion.div>
			</div>
		</section>
	);
}
