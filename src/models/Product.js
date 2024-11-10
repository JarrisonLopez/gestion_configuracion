import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ingresar el nombre del producto.'],
  },
  description: {
    type: String,
    required: [true, 'Ingresar descripción del producto'],
  },
  price: {
    type: Number,
    required: [true, 'Ingresar el precio del producto.'],
  },
  quantity: {
    type: Number,
    required: [true, 'Ingresar la cantidad del producto.'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
