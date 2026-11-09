"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
	{ label: "About", href: "#about" },
	{ label: "Projects", href: "#projects" },
	{ label: "Life", href: "#life" },
	{ label: "Contact", href: "#contact" },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState<string | null>(null);

	// Scroll state + scroll-spy. Sections are lazy-loaded, so look them up on
	// every (rAF-throttled) scroll instead of observing them once at mount.
	useEffect(() => {
		let frame = 0;
		const update = () => {
			frame = 0;
			setScrolled(window.scrollY > 50);
			const line = window.innerHeight * 0.4;
			let current: string | null = null;
			for (const { href } of NAV_LINKS) {
				const el = document.getElementById(href.slice(1));
				if (el && el.getBoundingClientRect().top <= line) current = href;
			}
			const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
			if (atBottom) current = NAV_LINKS[NAV_LINKS.length - 1].href;
			setActive(current);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	// Close the mobile menu on Escape
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open]);

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
					aria-label="Lawrence Degoma, back to top"
					className="py-2 text-lg font-bold tracking-tight"
					style={{ fontFamily: "var(--font-space-grotesk)" }}
				>
					<span className="text-gradient">LD</span>
					<span
						className="text-white/55 text-xs ml-2"
						style={{ fontFamily: "var(--font-space-mono)" }}
					>
						<span suppressHydrationWarning>v{new Date().getFullYear()}</span>
					</span>
				</a>

				{/* Desktop nav */}
				<div className="hidden md:flex items-center gap-8">
					{NAV_LINKS.map((link) => {
						const isActive = active === link.href;
						return (
							<a
								key={link.label}
								href={link.href}
								aria-current={isActive ? "location" : undefined}
								className={`py-3 text-sm font-medium transition-colors duration-200 relative group ${
									isActive ? "text-white" : "text-white/60 hover:text-white"
								}`}
							>
								{isActive && (
									<motion.span
										layoutId="nav-active"
										aria-hidden
										transition={{ type: "spring", stiffness: 420, damping: 36 }}
										className="absolute -inset-x-3 inset-y-1.5 -z-10 rounded-md bg-white/[0.07] ring-1 ring-white/10"
									/>
								)}
								{link.label}
								{!isActive && (
									<span aria-hidden className="absolute bottom-2.5 left-0 w-0 h-px bg-orange-500 group-hover:w-full transition-all duration-300" />
								)}
							</a>
						);
					})}
					<a
						href="mailto:lawrencedegoma02@gmail.com"
						className="px-5 py-2.5 rounded-md font-semibold text-sm text-white glass border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
					>
						Hire Me
					</a>
				</div>

				{/* Mobile toggle */}
				<button
					type="button"
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
					aria-controls="mobile-menu"
					className="md:hidden -mr-2 p-3 text-white/70 hover:text-white transition-colors"
					onClick={() => setOpen(!open)}
				>
					{open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
				</button>
			</div>

			{/* Mobile menu */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						id="mobile-menu"
						className="md:hidden border-t border-white/5 overflow-hidden"
						style={{
							background: "rgba(12,12,12,0.97)",
							backdropFilter: "blur(20px)",
						}}
					>
						<div className="px-6 py-4">
							{NAV_LINKS.map((link) => {
								const isActive = active === link.href;
								return (
									<a
										key={link.label}
										href={link.href}
										aria-current={isActive ? "location" : undefined}
										onClick={() => setOpen(false)}
										className={`relative block py-3 text-base font-medium transition-colors ${
											isActive ? "text-white" : "text-white/70 hover:text-white"
										}`}
									>
										<span
											aria-hidden
											className={`absolute -left-3 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full transition-colors ${isActive ? "bg-orange-500" : "bg-transparent"}`}
										/>
										{link.label}
									</a>
								);
							})}
							<a
								href="mailto:lawrencedegoma02@gmail.com"
								onClick={() => setOpen(false)}
								className="mt-3 inline-flex px-5 py-3 rounded-md font-semibold text-sm text-white glass border border-white/10"
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
