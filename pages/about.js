import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: contentRef, inView: contentInView } = useInView({ threshold: 0.1 });

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
          Nuestra Historia
        </h1>
        <div 
          ref={contentRef}
          className={`bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto transition-opacity duration-500 ${contentInView ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
            La Tienda del Taller nació en 2023 con la visión de revolucionar la industria artesanal. Nos dedicamos a ofrecer productos innovadores que combinan artesanía y tecnología, siempre pensando en el futuro del diseño.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Nuestro compromiso con la calidad y la innovación nos ha permitido crecer rápidamente, convirtiéndonos en referentes del diseño artesanal futurista. En la Tienda del Taller, no solo seguimos las tendencias, las creamos.
          </p>
        </div>
      </div>
    </div>
  );
}
