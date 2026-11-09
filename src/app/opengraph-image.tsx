import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Lawrence Degoma — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAGLINE = "I build real tools that solve real problems — from crowdsourced parking apps to computer vision HUDs.";

// Satori needs TTF/OTF, so ask Google Fonts for exactly the glyphs we render.
// Falls back to the built-in font if the request fails (e.g. offline build).
async function loadFont(family: string, weight: number, text: string) {
	try {
		const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
		const css = await (await fetch(url)).text();
		const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
		if (!src) return null;
		const res = await fetch(src);
		return res.ok ? await res.arrayBuffer() : null;
	} catch {
		return null;
	}
}

export default async function OpengraphImage() {
	const [photo, bold, regular, mono] = await Promise.all([
		readFile(join(process.cwd(), "src/assets/og-photo.jpg")),
		loadFont("Space Grotesk", 700, "LawrenceDegoma"),
		loadFont("Space Grotesk", 400, TAGLINE),
		loadFont("Space Mono", 400, "SOFTWARE ENGINEER · CSULB"),
	]);
	const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

	const fonts = [
		bold && { name: "Grotesk", data: bold, weight: 700 as const },
		regular && { name: "Grotesk", data: regular, weight: 400 as const },
		mono && { name: "Mono", data: mono, weight: 400 as const },
	].filter((f): f is NonNullable<typeof f> => Boolean(f));

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 96px",
					background: "#0c0c0c",
					backgroundImage: "radial-gradient(circle at 78% 50%, rgba(234,88,12,0.22), transparent 55%)",
					fontFamily: "Grotesk",
					color: "#f5f5f5",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
					<div style={{ display: "flex", fontFamily: "Mono", fontSize: 24, letterSpacing: 4, color: "#f97316", marginBottom: 28 }}>
						SOFTWARE ENGINEER · CSULB
					</div>
					<div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3 }}>
						<span style={{ color: "rgba(255,255,255,0.92)" }}>Lawrence</span>
						<span style={{ color: "#f97316" }}>Degoma</span>
					</div>
					<div style={{ display: "flex", fontSize: 30, lineHeight: 1.4, color: "rgba(255,255,255,0.62)", marginTop: 36 }}>
						{TAGLINE}
					</div>
				</div>

				<div
					style={{
						display: "flex",
						width: 340,
						height: 340,
						borderRadius: 9999,
						border: "4px solid rgba(234,88,12,0.6)",
						boxShadow: "0 0 80px rgba(234,88,12,0.35)",
						overflow: "hidden",
					}}
				>
					<img src={photoSrc} alt="" width={340} height={453} style={{ objectFit: "cover", objectPosition: "top" }} />
				</div>
			</div>
		),
		{ ...size, fonts: fonts.length ? fonts : undefined },
	);
}
