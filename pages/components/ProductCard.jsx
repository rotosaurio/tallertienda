import Link from "next/link";
import { useState } from "react";

const ProductCard = ({ producto }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div 
			className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 overflow-hidden hover:shadow-primary/50"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg">
				<img 
					src={producto.imagen}  
					alt={producto.nombre} 
					className="w-full h-full object-cover transition-transform duration-500"
				/>
				<div 
					className={`absolute inset-0 bg-primary transition-opacity duration-300 ${
						isHovered ? 'opacity-30' : 'opacity-0'
					}`}
				></div>
				{isHovered && (
					<div className="absolute inset-0 flex items-center justify-center">
						<p className="text-white text-lg font-semibold">Ver Detalles</p>
					</div>
				)}
			</div>
			<h2 className="text-xl font-semibold mb-2 text-primary">{producto.nombre}</h2>
			<p className="text-gray-800 dark:text-white text-lg font-bold mb-2">${producto.precio}</p>
			<p className="text-sm mb-4 text-gray-600 dark:text-gray-300">{producto.descripcion}</p>
			<Link 
				href={`/producto/${producto._id}`} 
				className="block bg-primary text-white text-center px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300 transform hover:scale-105 hover:shadow-lg"
			>
				Ver Detalles
			</Link>
		</div>
	);
};

export default ProductCard;

