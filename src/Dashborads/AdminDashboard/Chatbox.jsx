import React, { useState } from "react";

export default function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, time: new Date().toLocaleTimeString() }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col">
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className="p-2 bg-blue-100 rounded-md animate-fade-in">
            <p>{msg.text}</p>
            <span className="text-xs text-gray-500">{msg.time}</span>
          </div>
        ))}
      </div>
      <div className="flex border-t p-2">
        <input
          className="flex-1 border rounded-l px-2"
          placeholder="Type a message"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600">Send</button>
      </div>
    </div>
  );
}
