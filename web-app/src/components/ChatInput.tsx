"use client";
import { Message } from "@/app/types";
// import { IconArrowUp } from "@tabler/icons";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
interface Props {
  query: string;
  setQuery: (query: string) => void;
  send_query: (message: Message) => void;
}

export const ChatInput: FC<Props> = ({ query, setQuery, send_query }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 4000) {
      alert("Message limit is 4000 characters");
      return;
    }

    setQuery(value);
  };

  const handleSend = () => {
    if (!query) {
      alert("Please enter a message");
      return;
    }
    send_query({ type: "text", position: "right", text: query, title: "You" });
    setQuery("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [query]);

  return (
    <div className="flex items-center relative mt-2">
      <video ref={videoRef} className="hidden" />
      <input
        ref={textareaRef}
        type="text"
        className="min-h-[44px] rounded-l-lg px-2 py-3 w-full focus:outline-none focus:ring-1 focus:ring-neutral-300 border-2 border-neutral-200"
        placeholder="Type your message..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button
        onClick={handleSend}
        className="rounded-r-lg px-3 py-4 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </button>
    </div>
  );
};