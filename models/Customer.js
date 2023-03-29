import mongoose from 'mongoose';
const { Schema } = mongoose;

const CustomerSchema = mongoose.Schema({
    MAKH: {
        type: String,
        unique: true, 
        maxLength: 10,
        required:[true,"MAKH is required"]
    },
    TenKH:{
        type:String,
        maxLength: 50,
        required:[true,"TenKH is required"]
    },
    TenKH:{
        type:String,
        maxLength: 15,
        required:[true,"TenKH is required"]
    },
    DIENTHOAI:{
        type:String,
        maxLength: 15,
        required:[true,"DIENTHOAI is required"]
    },
    DIACHI:{
        type:String,
        maxLength: 50,
        required:[true,"DIENTHOAI is required"]
    }
},{timestamps:true})
export default mongoose.models.KhachHang ||  mongoose.model("KhachHang",CustomerSchema)