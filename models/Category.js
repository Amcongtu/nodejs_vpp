import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      uniqe:true,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    bannerImage: {
      type: String,
      required: true
    },
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HangHoa'
    }]
  },{timestamps:true});
  
export default mongoose.models.DanhMuc || mongoose.model('DanhMuc', categorySchema);