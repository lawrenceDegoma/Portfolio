'use client';

import { useState } from 'react';

type Project = {
  title: string;
  short: string;
  details: string;
  link?: string;
};

const projects: Project[] = [
  {
    title: 'Cafédex Website',
    short: 'A cafe finder designed with creative inspiration from the Pokédex in Pokemon games.',
    details:
      'Developed a responsive website for cafe recommendations in the greater LA, OC, and Pasadena without the use of frameworks.',
    link: 'https://lawrencedegoma.github.io/sea-Round2-Project/',
  },
  {
    title: 'HTML/CSS Parser',
    short: 'Custom built HTML and CSS renderer using SFML',
    details:
      'This project parses and displays web pages using a tree structure for HTML and a map for CSS, showcasing an in-depth understanding of the architecture behind the languages along with experience with rendering engines.',
    link: 'https://github.com/lawrenceDegoma/HTML_Parser',
  },
  {
    title: 'AI Voice Assistant',
    short: 'Voice assistant using Google Cloud and OpenAI APIs',
    details:
      'Processes speech-to-text and returns AI generated responses using custom voices via Voice AI. Build for unique interactions and personalization.',
  },
];

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(index == openIndex ? null: index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Personal Projects</h2>
      {projects.map((proj, i) => (
        <div
          key={i}
          className="mb-4 border border-gray-700 rounded-xl overflow-hidden tansition-all shadow hover:shadow-md"
        >
          <button
            onClick={() => toggle(i)}
            className="w-full text-left px-6 py-4 bg-gray-800 hover:bg-gray-700 font-semibold flex justify-between items-center"
          >
            <span>{proj.title}</span>
            <span>{openIndex === i ? '-' : '+'}</span>
          </button>
          {openIndex === i && (
            <div className="px-6 py-4 bg-white text-gray-700">
              <p className="mb-2">{proj.details}</p>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="nooperner noreferer"
                  className="text-gray-500 hover:cursor-pointer"
                >
                  View Live
                </a>
              )}
            </div>
          )}
        </div>
    ))}
    </div>
  );
}
