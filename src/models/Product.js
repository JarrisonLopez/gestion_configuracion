import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ingresar el nombre del producto.'],
  },
  description: {
    type: String,
    required: [true, 'Ingresar descripcion del producto'],
  },
  price: {
    type: Number,
    required: [true, 'ingresar el precio del producto.'],
  },
  quantity: {
    type: Number,
    required: [true, 'INGRESAR LA CANTIDAD DEL PRODUCTO.'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);