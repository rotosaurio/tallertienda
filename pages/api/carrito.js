import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db();
    const carritosCollection = database.collection("carritousuarios");
    const productosCollection = database.collection("productos");

    // Verificar el token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const usuarioId = decodedToken.userId;

    if (req.method === 'GET') {
      const carrito = await carritosCollection.findOne({ usuarioId: new ObjectId(usuarioId) });
      if (!carrito) {
        res.status(200).json([]);
      } else {
        const productosEnCarrito = await Promise.all(carrito.productos.map(async (productoId) => {
          return await productosCollection.findOne({ _id: new ObjectId(productoId) });
        }));
        res.status(200).json(productosEnCarrito);
      }
    } else if (req.method === 'POST') {
      const { action, producto, productoId } = req.body;

      if (action === 'add') {
        await carritosCollection.updateOne(
          { usuarioId: new ObjectId(usuarioId) },
          { $addToSet: { productos: producto._id } },
          { upsert: true }
        );
        res.status(200).json({ message: 'Producto añadido al carrito' });
      } else if (action === 'remove') {
        await carritosCollection.updateOne(
          { usuarioId: new ObjectId(usuarioId) },
          { $pull: { productos: productoId } }
        );
        res.status(200).json({ message: 'Producto eliminado del carrito' });
      } else {
        res.status(400).json({ error: 'Acción no válida' });
      }
    } else {
      res.status(405).json({ error: 'Método no permitido' });
    }
  } catch (error) {
    console.error("Error en la operación del carrito:", error);
    res.status(500).json({ error: "Error en la operación del carrito" });
  } finally {
    await client.close();
  }
}
