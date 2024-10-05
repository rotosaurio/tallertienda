import { useState, useEffect } from 'react';
import Navbar from './components/navbar';

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    fetchCarrito();
  }, []);

  const fetchCarrito = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay token de autenticación');
      }
      const res = await fetch('/api/carrito', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setCarrito(data);
      } else {
        throw new Error('Error al obtener el carrito');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al obtener el carrito');
    }
  };

  const eliminarDelCarrito = async (productoId) => {
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
        body: JSON.stringify({ action: 'remove', productoId }),
      });
      if (res.ok) {
        fetchCarrito();
      } else {
        throw new Error('Error al eliminar del carrito');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar del carrito');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Tu Carrito</h1>
        {carrito.length === 0 ? (
          <p className="text-center">Tu carrito está vacío</p>
        ) : (
          <div>
            {carrito.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 mb-4 rounded-lg">
                <div className="flex items-center">
                  <img src={item.imagen} alt={item.nombre} className="w-20 h-20 object-cover mr-4" />
                  <div>
                    <h2 className="text-xl font-semibold">{item.nombre}</h2>
                    <p className="text-gray-600 dark:text-gray-300">${item.precio}</p>
                  </div>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <div className="text-right mt-8">
              <p className="text-2xl font-bold">
                Total: ${carrito.reduce((total, item) => total + item.precio, 0).toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
