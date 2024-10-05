import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb'; // Added import for ObjectId

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection("usuarios");

    if (req.body.action === 'register') {
      const { nombre, correo, contraseña } = req.body;
      const usuarioExistente = await collection.findOne({ correo });

      if (usuarioExistente) {
        res.status(400).json({ error: "El correo ya está registrado" });
        return;
      }

      const hashedPassword = await bcrypt.hash(contraseña, 10);
      const nuevoUsuario = {
        nombre,
        correo,
        contraseña: hashedPassword,
        rol: 'usuario'
      };

      const result = await collection.insertOne(nuevoUsuario);

      // Crear un carrito vacío para el usuario usando el ID del usuario
      const carritosCollection = database.collection("carritousuarios");
      await carritosCollection.insertOne({ usuarioId: result.insertedId, productos: [] });

      res.status(201).json({ message: "Usuario registrado exitosamente", id: result.insertedId });
    } else if (req.body.action === 'login') {
      const { correo, contraseña } = req.body;
      const usuario = await collection.findOne({ correo });

      if (!usuario) {
        res.status(400).json({ error: "Credenciales inválidas" });
        return;
      }

      const passwordMatch = await bcrypt.compare(contraseña, usuario.contraseña);

      if (!passwordMatch) {
        res.status(400).json({ error: "Credenciales inválidas" });
        return;
      }

      const token = jwt.sign(
        { userId: usuario._id, correo: usuario.correo, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol } });
    }
  } catch (error) {
    console.error("Error en la autenticación:", error);
    res.status(500).json({ error: "Error en el servidor" });
  } finally {
    await client.close();
  }
}
