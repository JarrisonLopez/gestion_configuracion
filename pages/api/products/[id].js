import connectToDatabase from '../../../src/lib/mongoose';
import Product from '../../../src/models/Product';

export default async function handler(req, res) {
  const { id } = req.query;

  // Conectar a la base de datos
  try {
    await connectToDatabase();
    console.log("Conectado a MongoDB exitosamente.");
  } catch (error) {
    console.error("Fallo al conectar a MongoDB:", error);
    return res.status(500).json({ error: 'Fallo en la conexión a la base de datos', details: error.message });
  }

  // Manejar la solicitud GET para obtener un producto específico
  if (req.method === 'GET') {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error("Fallo al obtener el producto:", error);
      res.status(500).json({ error: 'Fallo al obtener el producto', details: error.message });
    }
  } 
  // Manejar la solicitud PUT para actualizar un producto específico
  else if (req.method === 'PUT') {
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error("Fallo al actualizar el producto:", error);
      res.status(400).json({ error: 'Fallo al actualizar el producto', details: error.message });
    }
  } 
  // Manejar la solicitud DELETE para eliminar un producto específico
  else if (req.method === 'DELETE') {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      console.error("Fallo al eliminar el producto:", error);
      res.status(500).json({ error: 'Fallo al eliminar el producto', details: error.message });
    }
  } 
  // Manejar cualquier otro método HTTP no permitido
  else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
