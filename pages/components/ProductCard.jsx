import Link from "next/link";
 
const ProductCard = ({ producto }) => {
return (
    <div className = "border p-4 rounded-lg shadow-lg">
        <h2 className = "text-xl font-semibold mb-2">{producto.producto}</h2>
        <p className = "text-gray-600">${producto.precio} precio</p>
        <Link href={`/productos/${producto.id}`} className = "mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Ver Detalles</Link>
    </div>
);
};

export default ProductCard;

 