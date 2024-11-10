import connectToDatabase from '../../../src/lib/mongoose';
import Product from '../../../src/models/Product';

export default async function handler(req, res) {
  // Intentar conectar a la base de datos
  try {
    await connectToDatabase();
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return res.status(500).json({ error: 'Database connection failed' });
  }

  // Manejar la solicitud GET para obtener productos
  if (req.method === 'GET') {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } 
  // Manejar la solicitud POST para agregar un nuevo producto
  else if (req.method === 'POST') {
    try {
      console.log("Received data:", req.body); // Registrar datos recibidos

      // Crear una nueva instancia de Product
      const product = new Product(req.body);

      // Guardar el producto en la base de datos
      await product.save();

      console.log("Product saved successfully:", product); // Registrar el producto guardado
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
