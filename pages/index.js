import Navbar from "./components/navbar";
import ProductCard from "./components/ProductCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer';

export default function Home({ productos }) {
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
          className={`text-6xl font-bold text-center mb-8 text-primary transition-all duration-500 ${titleInView ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: `translateY(${scrollY * 0.5}px) scale(${1 - scrollY * 0.001})` }}
        >
          Tienda del Taller
        </h1>
        <p 
          ref={descRef}
          className={`text-center mb-12 text-xl leading-relaxed max-w-3xl mx-auto text-gray-600 dark:text-gray-300 transition-opacity duration-500 ${descInView ? 'opacity-100' : 'opacity-0'}`}
        >
          En la Tienda del Taller, fusionamos la artesanía con la innovación. Nuestros productos no solo 
          siguen las últimas tendencias, sino que las definen. Descubre una colección que 
          te hará destacar en cualquier ocasión.
        </p>
        <div 
          ref={productsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-opacity duration-500 ${productsInView ? 'opacity-100' : 'opacity-0'}`}
        >
          {productos.slice(0, 3).map((producto, index) => (
            <div key={producto.id} className="transform transition-all duration-500 hover:scale-105"
                 style={{ transitionDelay: `${index * 100}ms` }}>
              <ProductCard producto={producto} />
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/productos" className="bg-primary text-white px-8 py-3 rounded-md hover:bg-opacity-80 transition duration-300 text-lg font-semibold inline-block">
            Explorar Colección Completa
          </Link>
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
