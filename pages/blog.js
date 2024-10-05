import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer';

export default function Blog() {
  const [scrollY, setScrollY] = useState(0);
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: postsRef, inView: postsInView } = useInView({ threshold: 0.1 });

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
          Tendencias del Futuro
        </h1>
        <div 
          ref={postsRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-500 ${postsInView ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-primary/50 transition duration-300">
            <h2 className="text-2xl font-bold mb-4 text-primary">La Artesanía en la Era Digital</h2>
            <p className="text-gray-700 dark:text-gray-300">Explora cómo la tecnología está transformando la industria artesanal, desde productos inteligentes hasta experiencias de compra virtuales.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-primary/50 transition duration-300">
            <h2 className="text-2xl font-bold mb-4 text-primary">Sostenibilidad: El Nuevo Estándar</h2>
            <p className="text-gray-700 dark:text-gray-300">Descubre cómo la artesanía sostenible está redefiniendo el concepto de calidad y cambiando la forma en que consumimos productos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
