import React, { useEffect, useState } from "react";
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import { Listbox, Transition } from "@headlessui/react";
// import { SocketContext } from '@/app/layout';
// import { title } from 'process';
import axios from "axios";
import { ChatInput } from "./ChatInput";

function ChatInterface({description}) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  // const socket = React.useContext(SocketContext);

  const query_response = (data: any) => {
    console.log("new response add",data, messages);
    // setMessages([...messages, {position: 'left', type: 'text', text: data.data,title:'Inventory assistant'}]);
    const new_msg = {
      position: "left",
      type: "text",
      text: data,
      title: "BaristoAI",
    };
    setMessages((prev) => [...prev, new_msg]);
  };

  const send_query = async  () => {
    console.log(query);
    // setMessages([...messages, {position: 'right', type: 'text', text: query,title: 'You'}]);
    const new_msg = {
      type: "text",
      position: "right",
      text: query,
      title: "You",
    };
    setMessages((prev) => [...prev, new_msg]);
    console.log(process.env.NEXT_PUBLIC_API_URL);
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/chat`, { question: query, details: description })
      .then((res) => {
        console.log("res from back",res.data.answer);
        query_response(res.data.answer);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        {messages.map((message, index) => (
          <MessageBox
            key={index}
            position={message.position}
            type={message.type}
            title={message.title}
            text={message.text}
          />
        ))}
      </div>
      <div className="flex items-start space-x-4">
        <div className="min-w-0 flex-1">
          <ChatInput query={query} setQuery={setQuery} send_query={send_query} />
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;