"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Cpu } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";

const SKILLS = [
	{ category: "Languages", items: ["Python", "Swift", "C++", "JavaScript", "TypeScript", "C"] },
	{ category: "Frameworks & Libraries", items: ["OpenCV", "MediaPipe", "React", "Node.js", "Tailwind", "Firebase"] },
	{ category: "Operating Systems", items: ["MacOS", "Linux"] },
	{ category: "Domains", items: ["Human-Machine Interfaces (HMI)", "Real-Time Interaction Systems", "Computer Vision", "Platform Engineering"] },
];

const STATS = [
  { value: 4, suffix: "+", label: "Projects Shipped" },
  { value: 3, suffix: "+", label: "Years Coding" },
  { value: null, display: "CSULB", label: "CS Degree" },
  { value: null, display: "∞", label: "Ideas Brewing" },
];const fadeUp = {
	hidden: { opacity: 0, y: 40 },
	visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function About() {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section id="about" ref={ref} className="py-32 px-6 relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 z-0">
				<div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-orange-500/15 to-transparent" style={{ left: "10%" }} />
				<div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-amber-500/15 to-transparent" style={{ right: "10%" }} />
			</div>

			<div className="max-w-6xl mx-auto relative z-10">

        {/* Section header */}
        <BlurFade delay={0} inView>
          <div className="text-center mb-20">
            <p className="text-orange-500 text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-space-mono)" }}>// who i am</p>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              More Than Just <span className="text-gradient">Code</span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              I&apos;m Lawrence — a software engineer who believes the best engineers are those who are curious first.
              My curiosity doesn&apos;t stop at the terminal.
            </p>
          </div>
        </BlurFade>

			{/* Stats row */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
					{STATS.map((stat, i) => (
						<BlurFade key={i} delay={0.1 + i * 0.1} inView>
							<div className="glass rounded-lg p-6 text-center group hover:border-orange-500/30 transition-all duration-300">
								<div className="text-4xl font-bold text-gradient mb-2">
									{stat.value !== null && stat.value !== undefined ? (
										<><NumberTicker value={stat.value} />{stat.suffix}</>
									) : (
										stat.display
									)}
								</div>
								<div className="text-white/50 text-sm font-medium">{stat.label}</div>
							</div>
						</BlurFade>
					))}
				</div>

				{/* Two columns: bio + skills */}
				<div className="grid lg:grid-cols-2 gap-12 mb-20">

					{/* Bio */}
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						animate={inView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.2 }}
					>
						<div className="flex items-center gap-3 mb-6">
							<div className="p-2 rounded-md bg-orange-500/15 text-orange-400">
								<Cpu size={20} />
							</div>
							<h3 className="text-2xl font-bold text-white">The Engineer</h3>
						</div>
						<div className="space-y-5 text-white/60 leading-relaxed text-[15px]">
							<p>
								I'm a Computer Science student at <span className="text-orange-300 font-semibold">Cal State Long Beach</span> with a deep passion for
								building tools that feel like magic. Whether it's a crowdsourced parking app that turns every student's phone into an anonymous sensor,
								a gesture-controlled computer vision HUD, or a real-time bartender ordering system — I build for impact.
							</p>
							<p>
								I gravitate toward projects that blend <span className="text-amber-300 font-semibold">creative problem-solving</span> with
								strong engineering fundamentals. My work spans full-stack web development, computer vision,
								CLI tools, and AI-powered applications.
							</p>
							<p>
								I'm hunting for a role where I can grow fast, work on things that matter, and ship
								software that <span className="text-orange-300 font-semibold">actually changes something</span>.
							</p>
						</div>
					</motion.div>

					{/* Skills */}
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						animate={inView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.3 }}
					>
						<div className="flex items-center gap-3 mb-6">
							<div className="p-2 rounded-md bg-orange-500/15 text-orange-400">
								<Code2 size={20} />
							</div>
							<h3 className="text-2xl font-bold text-white">The Stack</h3>
						</div>
						<div className="space-y-6">
							{SKILLS.map((group, i) => (
								<div key={i}>
									<p className="text-xs text-white/30 uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-space-mono)" }}>{group.category}</p>
									<div className="flex flex-wrap gap-2">
										{group.items.map((item, j) => (
											<motion.span
												key={j}
												custom={j}
												variants={fadeUp}
												initial="hidden"
												animate={inView ? "visible" : "hidden"}
												className="px-3 py-1.5 glass rounded-md text-sm font-medium text-white/70 hover:text-white hover:border-orange-500/40 border border-white/5 transition-all duration-200 cursor-default"
											>
												{item}
											</motion.span>
										))}
									</div>
								</div>
							))}
						</div>
					</motion.div>
				</div>

			</div>
		</section>
	);
}
