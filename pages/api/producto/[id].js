import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection("productos");
    
    const producto = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!producto) {
      res.status(404).json({ error: "Producto no encontrado" });
    } else {
      res.status(200).json(producto);
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  } finally {
    await client.close();
  }
}
