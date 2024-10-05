import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const INITIAL_MESSAGE = {
  role: 'system',
  content: `Eres un asistente virtual de la Tienda Taller, especializado en soporte técnico y ayuda de ventas. 
  La Tienda Taller es una tienda en línea que vende productos artesanales innovadores que combinan artesanía y tecnología. 
  Ofrece ayuda amable y profesional, responde preguntas sobre productos, procesos de compra, envíos, devoluciones y cualquier problema técnico que los clientes puedan tener con los productos o el sitio web.`
};

const ChatWindow = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [...chatHistory, userMessage],
      });

      const aiMessage = { role: 'assistant', content: response.choices[0].message.content };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error al procesar el mensaje:', error);
      setChatHistory(prev => [...prev, { role: 'assistant', content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo más tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center bg-blue-500 dark:bg-blue-600 text-white p-3 rounded-t-lg">
        <h3 className="font-bold">Asistente de Tienda Taller</h3>
        <button onClick={onClose} className="text-xl hover:text-gray-200">&times;</button>
      </div>
      <div ref={chatContainerRef} className="h-64 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900">
        {chatHistory.slice(1).map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-blue-100 dark:bg-blue-700 text-gray-800 dark:text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white'
            }`}>
              {msg.content}
            </span>
          </div>
        ))}
        {isLoading && <div className="text-center text-gray-500 dark:text-gray-400">Procesando...</div>}
      </div>
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition duration-300 disabled:opacity-50"
            disabled={isLoading}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;