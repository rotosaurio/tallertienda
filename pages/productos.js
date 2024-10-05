import Navbar from "./components/navbar";
import ProductList from "./components/ProductoList";
import { useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer';

export default function Productos({ productos }) {
  const [scrollY, setScrollY] = useState(0);
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: descRef, inView: descInView } = useInView({ threshold: 0.1 });
  const { ref: productsRef, inView: productsInView } = useInView({ threshold: 0.1 });

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
          Nuestra Colección
        </h1>
        <p 
          ref={descRef}
          className={`text-center mb-12 text-xl leading-relaxed max-w-3xl mx-auto text-gray-600 dark:text-gray-300 transition-opacity duration-500 ${descInView ? 'opacity-100' : 'opacity-0'}`}
        >
          Explora nuestra selección de productos artesanales que definen el futuro del diseño.
        </p>
        <div 
          ref={productsRef}
          className={`transition-opacity duration-500 ${productsInView ? 'opacity-100' : 'opacity-0'}`}
        >
          <ProductList productos={productos} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello`);
  const productos = await res.json();
  return { props: { productos } };
}
