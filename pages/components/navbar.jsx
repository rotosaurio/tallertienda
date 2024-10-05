import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setUser(null);
        router.push('/');
    };

    if (!mounted) return null;

    return (
        <nav className="bg-white dark:bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-primary">Tienda del Taller</Link>
                <div className="hidden md:flex space-x-4 items-center">
                    <NavLink href="/">Inicio</NavLink>
                    <NavLink href="/productos">Colección</NavLink>
                    <NavLink href="/blog">Tendencias</NavLink>
                    <NavLink href="/about">Nuestra Historia</NavLink>
                    <NavLink href="/contact">Contacto</NavLink>
                    <NavLink href="/carrito">Carrito</NavLink>
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="px-3 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-opacity-80 transition duration-300"
                            >
                                {user.nombre}
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLink href="/login">Iniciar Sesión</NavLink>
                    )}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 text-xl focus:outline-none"
                        aria-label="Cambiar tema"
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 dark:text-white focus:outline-none">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                            ) : (
                                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden mt-4">
                    <NavLink href="/">Inicio</NavLink>
                    <NavLink href="/productos">Colección</NavLink>
                    <NavLink href="/blog">Tendencias</NavLink>
                    <NavLink href="/about">Nuestra Historia</NavLink>
                    <NavLink href="/contact">Contacto</NavLink>
                    <NavLink href="/carrito">Carrito</NavLink>
                    {user ? (
                        <>
                            <div className="px-3 py-2 text-sm font-medium bg-primary text-white">
                                {user.nombre}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 mt-2"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <NavLink href="/login">Iniciar Sesión</NavLink>
                    )}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="block w-full text-left px-3 py-2 text-xl mt-2"
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            )}
        </nav>
    )
}

const NavLink = ({ href, children }) => (
    <Link href={href} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
        {children}
    </Link>
)

export default Navbar;
