import ProductCard from "./ProductCard";

const ProductList = ({ productos }) => {
    return (
        <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {productos.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
            ))}
        </div>
    );
};
 
export default ProductList;

