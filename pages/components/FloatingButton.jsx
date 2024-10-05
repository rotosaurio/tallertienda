import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

const FloatingButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
      <button
        className={`fixed bottom-6 right-6 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none z-50 group ${
          isHovered ? 'scale-110' : ''
        }`}
        aria-label="Asistencia"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <span className="text-3xl group-hover:animate-wave absolute bottom-1 right-1">🤖</span>
        <span className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full transform -rotate-12 group-hover:rotate-0 transition-transform duration-300 glow-text">
          Asistencia con AI
        </span>
      </button>
    </>
  );
};

export default FloatingButton;
