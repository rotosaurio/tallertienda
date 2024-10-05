import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

export default function ProductoDetalle() {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchProducto(id);
    }
  }, [id]);

  const fetchProducto = async (productoId) => {
    try {
      const res = await fetch(`/api/producto/${productoId}`);
      if (!res.ok) {
        throw new Error('No se pudo obtener el producto');
      }
      const data = await res.json();
      setProducto(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const agregarAlCarrito = async (producto) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay token de autenticación');
      }
      const res = await fetch('/api/carrito', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action: 'add', producto }),
      });
      if (res.ok) {
        alert('Producto añadido al carrito');
      } else {
        throw new Error('Error al añadir al carrito');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al añadir al carrito');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!producto) return <div>No se encontró el producto</div>;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-96 w-full object-cover md:w-96" src={producto.imagen} alt={producto.nombre} />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-primary mb-2">{producto.nombre}</h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{producto.categoria}</p>
              <p className="text-gray-800 dark:text-white text-xl font-bold mb-4">${producto.precio}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{producto.descripcion}</p>
              <button 
                onClick={() => agregarAlCarrito(producto)}
                className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-opacity-80 transition duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
