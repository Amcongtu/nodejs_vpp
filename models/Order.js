import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
  customer: {
    type:String,
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HangHoa',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'canceled'],
    default: 'pending'
  }
},{timestamps:true});

export default mongoose.models.DonHang || mongoose.model('DonHang', OrderSchema);