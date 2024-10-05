import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer';

export default function Contact() {
  const [scrollY, setScrollY] = useState(0);
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: formRef, inView: formInView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 
          ref={titleRef}
          className={`text-5xl font-bold text-center mb-8 text-primary transition-all duration-500 ${titleInView ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: `translateY(${scrollY * 0.3}px) scale(${1 - scrollY * 0.0005})` }}
        >
          Contáctanos
        </h1>
        <div 
          ref={formRef}
          className={`max-w-md mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-opacity duration-500 ${formInView ? 'opacity-100' : 'opacity-0'}`}
        >
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-primary font-bold mb-2">Nombre</label>
              <input type="text" id="name" className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-primary font-bold mb-2">Email</label>
              <input type="email" id="email" className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-primary font-bold mb-2">Mensaje</label>
              <textarea id="message" rows="4" className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary"></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition duration-300">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
