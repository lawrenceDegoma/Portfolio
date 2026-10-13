"use client";

import React from "react";
import Image from "next/image";
import { Dumbbell, Music2, TreePine, Waves, Camera, Globe } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

const TILES = [
	{
		label: "Hiking",
		image: "/gorgonio.webp",
		icon: <TreePine size={16} />,
		desc: "Nothing resets the mind like a trail. The further from the city, the better.",
		span: "col-span-2 lg:col-span-2 lg:row-span-2",
		position: "object-center",
	},
	{
		label: "Music",
		image: "/bg.webp",
		icon: <Music2 size={16} />,
		desc: "~40k Spotify minutes a year. Whether it's listening or playing, it's how I focus, decompress, and move through the day.",
		span: "col-span-2 lg:col-span-2",
		position: "object-center",
	},
	{
		label: "Weightlifting",
		image: "/squatrack.webp",
		icon: <Dumbbell size={16} />,
		desc: "Consistency, showing up when I don't feel like it.",
		span: "col-span-1",
		position: "object-center",
	},
	{
		label: "Marine Life",
		image: "/crab.webp",
		icon: <Waves size={16} />,
		desc: "Endlessly complex, endlessly stunning ecosystems.",
		span: "col-span-1",
		position: "object-center",
	},
	{
		label: "Photography",
		image: "/photography.webp",
		icon: <Camera size={16} />,
		desc: "An eye for framing that inspires my design.",
		span: "col-span-1 lg:col-span-2",
		position: "object-center",
	},
	{
		label: "Travel",
		image: "/travel.webp",
		icon: <Globe size={16} />,
		desc: "New places, new perspectives. Exposure fuels creativity.",
		span: "col-span-1 lg:col-span-2",
		position: "object-center",
	},
];

export default function Life() {
	return (
		<section id="life" className="py-32 px-6 relative">
			<div className="max-w-6xl mx-auto relative z-10">
				<BlurFade delay={0} inView className="text-center mb-16">
					<p
						className="text-orange-500 text-sm tracking-widest uppercase mb-4"
						style={{ fontFamily: "var(--font-space-mono)" }}
					>
						// outside the terminal
					</p>
					<h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
						Life Beyond the <span className="text-gradient">Screen</span>
					</h2>
					<p className="text-xl text-white/50 max-w-2xl mx-auto">
						The things that keep me grounded, and make me a better engineer.
					</p>
				</BlurFade>

				<div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-4">
					{TILES.map((tile, i) => (
						<BlurFade key={tile.label} delay={0.05 + i * 0.08} inView className={tile.span}>
							<div className="group relative h-full w-full rounded-xl overflow-hidden border border-white/5 hover:border-orange-500/30 transition-colors duration-500">
								<Image
									src={tile.image}
									alt={tile.label}
									fill
									className={`object-cover ${tile.position} transition-transform duration-700 group-hover:scale-105`}
									sizes="(max-width: 1024px) 50vw, 50vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
								<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
									<div className="flex items-center gap-2 text-orange-400 mb-1">
										{tile.icon}
										<h3 className="text-white font-bold text-base sm:text-lg">{tile.label}</h3>
									</div>
									<p className="text-white/60 text-xs sm:text-sm leading-snug lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-24 lg:group-hover:opacity-100 transition-all duration-500 overflow-hidden line-clamp-2 lg:line-clamp-none">
										{tile.desc}
									</p>
								</div>
							</div>
						</BlurFade>
					))}
				</div>
			</div>
		</section>
	);
}
