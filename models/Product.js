import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = mongoose.Schema({
    MAHH:{
        type: String,
        unique: true,
        required: [true, "MAHH is required"],
        maxLength: 10,
    },
    TENHH:{
        type: String,
        unique: true,
        required:[true,"TENHH is required"],
        maxLength: 50,
    },
    DONGIA:{
        type: Number,
        required:[true,"DONGIA is required"],
    },
    NGAYSX:{
        type: Date, 
        default: Date.now,
    },
    HSD:{
        type: Date, 
        default: Date.now,
    },
    DVT:{
        type: String,
        required: [true, "DVT is required"],

    },
    LOAI:{
        type: String,
        required: [true, "LOAI is required"],

    },
    HINHANH:{
        type: [String],
        required: true
      },

},{timestamps:true})
export default mongoose.model.HangHoa || mongoose.model("HangHoa",ProductSchema)