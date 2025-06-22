import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import TiltedCard from './TiltedCard';

export default function AboutMe() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex flex-col items-center">
          <Image
            src="/profile.jpg"
            alt="Profile Picture"
            layout="intrinsic"
            width={120}
            height={120}
            className="rounded-full shadow-md w-32 md:w-40 lg:w-48"
          />
          <h1 className="text-4xl font-bold mt-4">Lawrence Degoma</h1>
        </div>

        <div className="text-center md:text-left">
          <p className="text-3xl font-bold inline border-b-2 border-[var(--border-color)]">
            ABOUT ME
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 max-w-prose">
            Hi, I'm Lawrence! I'm an aspiring software engineer completing my undergrad at
            the California State University of Long Beach. My professional objective is to
            secure a position within an innovative company that wants to change the world as
            much as I do. My passion lies in building tools that bridge creativity and
            technology. I'm always on the hunt to learn new things and build new projects
            and I welcome any opportunities that present themselves!
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-4 justify-center">
        <a
          href="https://github.com/lawrenceDegoma"
          target="_blank"
          className="text-gray-700 hover:cursor-pointer"
        >
          <FaGithub size={30} />
        </a>
        <a
          href="https://www.linkedin.com/in/lawrencedegoma"
          target="_blank"
          className="text-gray-700 hover:cursor-pointer"
        >
          <FaLinkedin size={30} />
        </a>
        <a
          href="mailto:lawrencedegoma02@gmail.com"
          className="text-gray-700 hover:cursor-pointer"
        >
          <FaEnvelope size={30} />
        </a>
      </div>
    </section>
  );
}
