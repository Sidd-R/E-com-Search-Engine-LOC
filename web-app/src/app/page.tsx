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
import TextToSpeech from "@/utils/textToSpeech";

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
    name: "TECNO POP 8 (Gravity Black,(8GB*+64GB)| 90Hz Punch Hole Display with Dynamic Port & Dual Speakers with DTS| 5000mAh Battery |10W Type-C| Side Fingerprint Sensor| Octa-Core Processor",
    designation: "6599",
    image: "https://m.media-amazon.com/images/I/61wbxpNaD1L._SX569_.jpg",
    badge: 3,
  },
  {
    name: "Redmi 13C 5G (Starlight Black, 6GB RAM, 128GB Storage) | MediaTek Dimensity 6100+ 5G | 90Hz Display",
    designation: "12499",
    image: "https://m.media-amazon.com/images/I/81L6069AwHL._SX569_.jpg",
    badge: 3,
  },
  {
    name: "Redmi Note 13 5G (Stealth Black, 12GB RAM, 256GB Storage) | MTK Dimensity 6080 5G | 7.6mm, Slimmest Note Ever",
    designation: "21999",
    image: "https://m.media-amazon.com/images/I/71NnrsYP63L._SX569_.jpg",
    badge: 4,
  },
  {
    name: "Oneplus Nord CE 3 5G (Grey Shimmer, 8GB RAM, 128GB Storage)",
    designation: "24999",
    image: "https://m.media-amazon.com/images/I/61abLrCfF7L._SX569_.jpg",
    badge: 5,
  },
  {
    name: "iQOO Z6 Lite 5G (Mystic Night, 6GB RAM, 128GB Storage) with Charger | Qualcomm Snapdragon 4 Gen 1 Processor | 120Hz FHD+ Display | Travel Adaptor Included in The Box",
    designation: "11999",
    image: "https://m.media-amazon.com/images/I/61M0tGMbBPL._SX466_.jpg",
    badge: 4,
  },
  {
    name: "Samsung Galaxy M04 Light Green, 4GB RAM, 128GB Storage | Upto 8GB RAM with RAM Plus | MediaTek Helio P35 Octa-core Processor | 5000 mAh Battery | 13MP Dual Camera",
    designation: "6999",
    image: "https://m.media-amazon.com/images/I/813sVzTfvaL._SX466_.jpg",
    badge: 3,
  },
  {
    name: "Redmi 13C 5G (Startrail Silver, 4GB RAM, 128GB Storage) | MediaTek Dimensity 6100+ 5G | 90Hz Display",
    designation: "10999",
    image: "https://m.media-amazon.com/images/I/813ZN8Pj-HL._SX569_.jpg",
    badge: 3,
  },
  {
    name: "TECNO POP 8 (Gravity Black,(8GB*+64GB)| 90Hz Punch Hole Display with Dynamic Port & Dual Speakers with DTS| 5000mAh Battery |10W Type-C| Side Fingerprint Sensor| Octa-Core Processor",
    designation: "6599",
    image: "https://m.media-amazon.com/images/I/61wbxpNaD1L._SX569_.jpg",
    badge: 5,
  },
  {
    name: "realme narzo 60 5G (Cosmic Black,8GB+128GB) | 90Hz Super AMOLED Display | Ultra Sharp 64 MP Camera | with 33W SUPERVOOC Charger",
    designation: "17999",
    image: "https://m.media-amazon.com/images/I/71r5svsNKyL._SX569_.jpg",
    badge: 4,
  },
  {
    name: "realme narzo 60X 5G（Nebula Purple 6GB,128GB Storage ） Up to 2TB External Memory | 50 MP AI Primary Camera | Segments only 33W Supervooc Charge",
    designation: "14499",
    image: "https://m.media-amazon.com/images/I/818UhQ1kpdL._SX569_.jpg",
    badge: 5,
  },
  {
    name: "Samsung Galaxy M34 5G (Waterfall Blue,8GB,128GB)|120Hz sAMOLED Display|50MP Triple No Shake Cam|6000 mAh Battery|4 Gen OS Upgrade & 5 Year Security Update|16GB RAM with RAM+|Android 13|Without Charger",
    designation: "17999",
    image: "https://m.media-amazon.com/images/I/91L9EF-OEGL._SX569_.jpg",
    badge: 3,
  },
  {
    name: "Samsung Galaxy M04 Light Green, 4GB RAM, 64GB Storage | Upto 8GB RAM with RAM Plus | MediaTek Helio P35 Octa-core Processor | 5000 mAh Battery | 13MP Dual Camera",
    designation: "7899",
    image: "https://m.media-amazon.com/images/I/813sVzTfvaL._SX466_.jpg",
    badge: 3,
  },
  {
    name: "Samsung Galaxy M04 Light Green, 4GB RAM, 64GB Storage | Upto 8GB RAM with RAM Plus | MediaTek Helio P35 Octa-core Processor | 5000 mAh Battery | 13MP Dual Camera",
    designation: "7899",
    image: "https://m.media-amazon.com/images/I/813sVzTfvaL._SX466_.jpg",
    badge: 4,
  },
  {
    name: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 256GB Storage)",
    designation: "19999",
    image: "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX569_.jpg",
    badge: 4,
  },
  {
    name: "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
    designation: "28980",
    image: "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY606_.jpg",
    badge: 3,
  },
  {
    name: "iQOO Z7 Pro 5G (Blue Lagoon, 8GB RAM, 256GB Storage) | 3D Curved AMOLED Display | 4nm MediaTek Dimesity 7200 5G Processor | 64MP Aura Light OIS Camera | Segment's Slimmest & Lightest Smartphone",
    designation: "24999",
    image: "https://m.media-amazon.com/images/I/61Id6WJDWqL._SX569_.jpg",
    badge: 3,
  },
  {
    name: "Samsung Galaxy M34 5G (Midnight Blue,8GB,128GB)|120Hz sAMOLED Display|50MP Triple No Shake Cam|6000 mAh Battery|4 Gen OS Upgrade & 5 Year Security Update|16GB RAM with RAM+|Android 13|Without Charger",
    designation: "17999",
    image: "https://m.media-amazon.com/images/I/91fonhAtoAL._SX569_.jpg",
    badge: 3,
  },
  {
    name: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 256GB Storage)",
    designation: "19999",
    image: "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX569_.jpg",
    badge: 4,
  },
  {
    name: "POCO C51 (Power Black, 6GB RAM, 128GB Storage)",
    designation: "5999",
    image: "https://m.media-amazon.com/images/I/61NJ8pnt8FL._SX569_.jpg",
    badge: 5,
  },
  {
    name: "Samsung Galaxy M14 5G (Smoky Teal,6GB,128GB)|50MP Triple Cam|Segment's Only 6000 mAh 5G SP|5nm Processor|2 Gen. OS Upgrade & 4 Year Security Update|12GB RAM with RAM Plus|Android 13|Without Charger",
    designation: "13990",
    image: "https://m.media-amazon.com/images/I/818VqDSKpCL._SX466_.jpg",
    badge: 4,
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

  const onAnswerChange = async (text: string) => {
    // console.log("ans change")
    // const res = await axios.post('http://localhost:5000/ans', {
    //     transcript: text,
    //     question_no: currentQuestion + 1
    // }).then((res) => res.data);
    // console.log(res)
    console.log("text", text);
    router.push(`/products/${text}`);

    // handleAnswerOption(res.option_index)
    // setAnswer(text);
  };

  const [recognizedText, setRecognizedText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let recognition: any = null;

    const startListening = () => {
      recognition = new window.webkitSpeechRecognition();
      console.log("started listening");
      recognition.continuous = true;
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        setRecognizedText(transcript);
      };
      recognition.start();
    };

    const stopListening = () => {
      if (recognition) {
        console.log("stopped listening");
        recognition.stop();
        // recognition.abort()
      }
    };

    if (isListening) {
      startListening();
    } else {
      stopListening();
    }

    return () => {
      stopListening();
    };
  }, [isListening]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      console.log("space down");
      setIsListening(true);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      console.log("space up");
      setIsListening(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // window.addEventListener('keydown', handleKeyDownN);
    // window.addEventListener('keyup', handleKeyUpN);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!isListening && recognizedText.trim() !== "") {
      onAnswerChange(recognizedText);
    }
  }, [recognizedText]);

  useEffect(() => {
    TextToSpeech(
      "Welcome to The Shopping Platform, Search Products of Your Choice. Press and hold spacebar to say your query"
    );
  }, []);

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
          <a href={`/products/${searchQuery}`} className="ml-5">
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
