"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const Navbar = dynamic(() => import("@/components/Navbar"));
const About = dynamic(() => import("@/components/About"), {
	loading: () => <div className="py-32" />,
});
const Projects = dynamic(() => import("@/components/ProjectsNew"), {
	loading: () => <div className="py-32" />,
});
const Contact = dynamic(() => import("@/components/Contact"), {
	loading: () => <div className="py-32" />,
});

export default function Home() {
	return (
		<main className="bg-[#0c0c0c] min-h-screen">
			<Navbar />
			<Hero />
			<About />
			<Projects />
			<Contact />
		</main>
	);
}
