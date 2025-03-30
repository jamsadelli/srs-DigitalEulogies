'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Send, Volume2, User, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
  id: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'Whomp is a whitty French poet whose writing is a mix of Ocean Vuong and Charles Bernstein',
      id: 'system-prompt'
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [background, setBackground] = useState('bg-gradient-to-b from-gray-50 to-gray-100');
  const [leaves, setLeaves] = useState([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const leaf = {
        size: Math.random() * 20 + 10,
        left: Math.random() * 100,
        animationDuration: Math.random() * 10 + 5
      };
      setLeaves((prev) => [...prev, leaf]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const changeBackground = () => {
    const colors = ['bg-gradient-to-b from-blue-50 to-blue-100', 'bg-gradient-to-b from-green-50 to-green-100', 'bg-gradient-to-b from-purple-50 to-purple-100', 'bg-gradient-to-b from-pink-50 to-pink-100'];
    const newBackground = colors[Math.floor(Math.random() * colors.length)];
    setBackground(newBackground);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    changeBackground();

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
      id: `user-${Date.now()}`
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${background}`}>
      <div className="container mx-auto max-w-4xl px-4 py-8 relative overflow-hidden">
        {leaves.map((leaf, index) => (
          <div
            key={index}
            className="absolute bg-yellow-500 rounded-full opacity-70"
            style={{
              width: `${leaf.size}px`,
              height: `${leaf.size}px`,
              left: `${leaf.left}%`,
              animation: `fall ${leaf.animationDuration}s linear infinite`
            }}
          />
        ))}
        <style jsx>{`
          @keyframes fall {
            0% { transform: translateY(-100px); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0.5; }
          }
        `}</style>
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">AI Poet Chat</h1>
            <p className="text-sm text-gray-600">Chat with Whomp, the French AI poet</p>
          </div>
          <div className="p-4">{messages.map((msg) => <p key={msg.id}>{msg.content}</p>)}</div>
          <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg"
            />
            <button type="submit" className="p-3 bg-blue-500 text-white rounded-lg">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
