import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from './components/navbar';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', correo, contraseña }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        router.push('/');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="correo" className="block text-primary font-bold mb-2">Correo</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contraseña" className="block text-primary font-bold mb-2">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition duration-300">
            Iniciar Sesión
          </button>
        </form>
        <p className="text-center mt-4">
          ¿No tienes una cuenta? <Link href="/registro" className="text-primary hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}
