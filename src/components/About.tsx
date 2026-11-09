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
            <p className="text-orange-500 text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-space-mono)" }}>{"// who i am"}</p>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              More Than Just <span className="text-gradient">Code</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Hey, I&apos;m Lawrence. I get curious about a lot of things, and writing software is
              usually how I end up exploring them.
            </p>
          </div>
        </BlurFade>

			{/* Stats row */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
					{STATS.map((stat, i) => (
						<BlurFade key={i} delay={0.1 + i * 0.1} inView>
							<div className="glass rounded-lg p-4 sm:p-6 text-center group hover:border-orange-500/30 transition-all duration-300">
								<div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
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
								I study Computer Science at <span className="text-orange-300 font-semibold">Cal State Long Beach</span>. Most of my
								projects start the same way: something small bugs me and I can&apos;t stop thinking about how to fix it.
								Finding parking on campus was a daily headache, so my friends and I built SharkPark. Interview prep is easier to stick
								with when you&apos;re not doing it alone, so I built Branch.
							</p>
							<p>
								I like the space where <span className="text-amber-300 font-semibold">design and engineering</span> meet:
								working out how something should feel to use, then doing the work to make it hold up. So far that&apos;s
								taken me through full-stack web apps, computer vision, a Raspberry Pi photobooth, and a couple of
								Chrome extensions.
							</p>
							<p>
								Right now I&apos;m looking for a full-time engineering role, ideally on a team where I&apos;d learn
								a lot from the people around me and work on <span className="text-orange-300 font-semibold">things people actually use</span>.
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
									<p className="text-xs text-white/55 uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-space-mono)" }}>{group.category}</p>
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
