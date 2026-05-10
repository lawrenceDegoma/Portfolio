"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
	{ label: "About", href: "#about" },
	{ label: "Projects", href: "#projects" },
	{ label: "Contact", href: "#contact" },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<motion.nav
			initial={{ y: -80, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, delay: 0.1 }}
			className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
				scrolled ? "py-3 glass border-b border-white/5" : "py-6 bg-transparent"
			}`}
		>
			<div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
				{/* Logo */}
				<a
					href="#"
					className="text-lg font-bold tracking-tight"
					style={{ fontFamily: "var(--font-space-grotesk)" }}
				>
					<span className="text-gradient">LD</span>
					<span
						className="text-white/30 text-xs ml-2"
						style={{ fontFamily: "var(--font-space-mono)" }}
					>
						v2025
					</span>
				</a>

				{/* Desktop nav */}
				<div className="hidden md:flex items-center gap-8">
					{NAV_LINKS.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className="text-white/50 hover:text-white text-sm font-medium transition-colors duration-200 relative group"
						>
							{link.label}
							<span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-500 group-hover:w-full transition-all duration-300" />
						</a>
					))}
					<a
						href="mailto:lawrencedegoma02@gmail.com"
						className="px-5 py-2.5 rounded-md font-semibold text-sm text-white glass border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
					>
						Hire Me
					</a>
				</div>

				{/* Mobile toggle */}
				<button
					className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
					onClick={() => setOpen(!open)}
				>
					{open ? <X size={22} /> : <Menu size={22} />}
				</button>
			</div>

			{/* Mobile menu */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden border-t border-white/5 overflow-hidden"
						style={{
							background: "rgba(12,12,12,0.97)",
							backdropFilter: "blur(20px)",
						}}
					>
						<div className="px-6 py-6 space-y-4">
							{NAV_LINKS.map((link) => (
								<a
									key={link.label}
									href={link.href}
									onClick={() => setOpen(false)}
									className="block text-white/60 hover:text-white text-base font-medium transition-colors"
								>
									{link.label}
								</a>
							))}
							<a
								href="mailto:lawrencedegoma02@gmail.com"
								className="inline-flex px-5 py-2.5 rounded-md font-semibold text-sm text-white glass border border-white/10"
							>
								Hire Me
							</a>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}
