import connectToDatabase from '../../../src/lib/mongoose';
import Product from '../../../src/models/Product';

export default async function handler(req, res) {
  // Connect to the database
  try {
    await connectToDatabase();
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return res.status(500).json({ error: 'Database connection failed', details: error.message });
  }

  // Handle GET request to fetch all products
  if (req.method === 'GET') {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
  } 
  // Handle POST request to create a new product
  else if (req.method === 'POST') {
    try {
      console.log("Received data:", req.body); // Log received data

      // Create a new Product instance
      const product = new Product(req.body);

      // Save the product to the database
      await product.save();

      console.log("Product saved successfully:", product); // Log the saved product
      res.status(201).json(product);
    } catch (error) {
      console.error("Failed to save product:", error);
      res.status(400).json({ error: 'Failed to save product', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}