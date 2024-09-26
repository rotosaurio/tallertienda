import Navbar from "./components/navbar";
import ProductList from "./components/ProductoList";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Home() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("/api/hello");
        const data = await response.data;
        setProductos(data);
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    };
    fetchProductos();
  }, []);
  return (
 <>
 <Navbar />
 <div className="container mx-auto p-8">
<h1 className="text-4xl font-bold text-center mb-8">Productos</h1>
<ProductList productos={productos} />
 </div>
 </>   
  );
}
