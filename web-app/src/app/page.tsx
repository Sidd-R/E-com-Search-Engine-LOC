"use client";
import React, { useState, Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { Boxes } from "../components/ui/background-boxes";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, MicrophoneIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Link from "next/link";

const words = [
  {
    text: "Search",
  },
  {
    text: "Products",
  },
  {
    text: "of",
  },
  {
    text: "Your",
  },
  {
    text: "Choice",
  },
];

const users = [
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://picsum.photos/id/10/300/300",
    badge: "Mentor",
  },
  {
    name: "Sarah Singh",
    designation: "Founder, Sarah's Kitchen",
    image: "https://picsum.photos/id/11/300/300",
    badge: "Mentor",
  },
  {
    name: "John Doe",
    designation: "Software Engineer, Tech Corp",
    image: "https://picsum.photos/id/12/300/300",
    badge: "Mentor",
  },
  {
    name: "Jane Smith",
    designation: "Product Manager, Innovate Inc",
    image: "https://picsum.photos/id/13/300/300",
    badge: "Mentor",
  },
  {
    name: "Robert Johnson",
    designation: "Data Scientist, DataWorks",
    image: "https://picsum.photos/id/14/300/300",
    badge: "Mentor",
  },
  {
    name: "Emily Davis",
    designation: "UX Designer, DesignHub",
    image: "https://picsum.photos/id/15/300/300",
    badge: "Mentor",
  },
  {
    name: "Michael Miller",
    designation: "CTO, FutureTech",
    image: "https://picsum.photos/id/16/300/300",
    badge: "Mentor",
  },
  {
    name: "Sarah Brown",
    designation: "CEO, StartUp",
    image: "https://picsum.photos/id/17/300/300",
  },
  {
    name: "James Wilson",
    designation: "DevOps Engineer, CloudNet",
    image: "https://picsum.photos/id/18/300/300",
    badge: "Something",
  },
  {
    name: "Patricia Moore",
    designation: "Marketing Manager, MarketGrowth",
    image: "https://picsum.photos/id/19/300/300",
    badge: "Mentor",
  },
  {
    name: "Richard Taylor",
    designation: "Frontend Developer, WebSolutions",
    image: "https://picsum.photos/id/20/300/300",
  },
  {
    name: "Linda Anderson",
    designation: "Backend Developer, ServerSecure",
    image: "https://picsum.photos/id/21/300/300",
  },
  {
    name: "William Thomas",
    designation: "Full Stack Developer, FullStack",
    image: "https://picsum.photos/id/22/300/300",
    badge: "Badger",
  },
  {
    name: "Elizabeth Jackson",
    designation: "Project Manager, ProManage",
    image: "https://picsum.photos/id/23/300/300",
    badge: "Mentor",
  },
  {
    name: "David White",
    designation: "Database Administrator, DataSafe",
    image: "https://picsum.photos/id/24/300/300",
    badge: "Advocate",
  },
  {
    name: "Jennifer Harris",
    designation: "Network Engineer, NetConnect",
    image: "https://picsum.photos/id/25/300/300",
  },
  {
    name: "Charles Clark",
    designation: "Security Analyst, SecureIT",
    image: "https://picsum.photos/id/26/300/300",
  },
  {
    name: "Susan Lewis",
    designation: "Systems Analyst, SysAnalyse",
    image: "https://picsum.photos/id/27/300/300",
  },
  {
    name: "Joseph Young",
    designation: "Mobile Developer, AppDev",
    image: "https://picsum.photos/id/28/300/300",
    badge: "Mentor",
  },
  {
    name: "Margaret Hall",
    designation: "Quality Assurance, BugFree",
    image: "https://picsum.photos/id/29/300/300",
    badge: "Developer",
  },
];

const BackgroundBoxesDemo = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [recording, setRecording] = React.useState(false);

  const handleVoiceInputStart = () => {
    console.log("Voice input started");
    setRecording(true);
  };

  const handleVoiceInputEnd = () => {
    console.log("Voice input ended");
    setRecording(false);
  };

  // useEffect(() => {
  //   if (recording) {
  //     // Start the speech synthesis
  //     startSpeechSynthesis();
  //   }
  // }, [recording]);

  // const startSpeechSynthesis = () => {
  //   const utterance = new SpeechSynthesisUtterance(
  //     "Please speak clearly and slowly"
  //   );
  //   utterance.volume = 1;
  //   utterance.rate = 1;
  //   utterance.pitch = 1;

  //   // Update query as speech is being read
  //   utterance.onend = () => {
  //     setSearchQuery((prevQuery) => prevQuery + " "); // Add a space to separate words
  //     startSpeechSynthesis(); // Continue to the next utterance
  //   };

  //   window.speechSynthesis.speak(utterance);
  // };

  return (
    <div className="py-15 sm:py-20 px-5 relative min-h-[100vh] w-full overflow-hidden bg-white flex flex-col items-center">
      <Transition show={recording} as={Fragment}>
        <div className="max-w-sm w-full bg-white absolute top-5 right-[50%] translate-x-[50%] shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">
                  Recording your voice!!
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Your voice is being recorded for voice search. Please speak
                  clearly and slowly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <TypewriterEffectSmooth words={words} />
      <h1 className="text-xl mt-4 z-20 font-semibold blue_gradient sm:hidden">
        Search Products of Your Choice
      </h1>
      <motion.div
        className="relative z-20 mt-2 rounded-md shadow-sm"
        whileFocus={{ scale: 1.2 }}
        whileHover={{ scale: 1.2 }}
      >
        <input
          type="text"
          name="price"
          id="price"
          className="block w-[100%] sm:w-[600px] border-0 py-4 pl-7 pr-20 text-gray-900 ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6 rounded-full focus:outline-none text-md shadow-sm"
          placeholder="Enter Product Name or Link.."
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <div className="absolute inset-y-0 right-4 flex items-center gap-2">
          <button
            onTouchStart={handleVoiceInputStart}
            onTouchEnd={handleVoiceInputEnd}
            onMouseDown={handleVoiceInputStart}
            onMouseUp={handleVoiceInputEnd}
          >
            <MicrophoneIcon className="block h-6 w-6" aria-hidden="true" />
          </button>
          <a href={`/products/${searchQuery}`}>
            <MagnifyingGlassIcon className="block h-6 w-6" aria-hidden="true" />
          </a>
        </div>
      </motion.div>
      <ContainerScroll
        users={users}
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold blue_gradient dark:text-white">
              Find & Compare <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Products
              </span>
            </h1>
          </>
        }
      />
    </div>
  );
};

export default BackgroundBoxesDemo;
