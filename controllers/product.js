import HangHoa from "../models/Product.js";
import cloudinary from 'cloudinary';
import Category from "../models/Category.js";

function connectCloud(){
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
      });
}
export const createProduct = async (req,res,next)=>
{
    connectCloud()
    const imageUrls = [];
    const arrayCloud = []
    try{
        console.log("11")
        const images =  req.body.HINHANH;
        
        // Upload each image to cloudinary and get their URLs
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: process.env.CLOUD_FODER_PRODUCTS });
          arrayCloud.push(cloudinaryResponse)
          imageUrls.push(cloudinaryResponse.secure_url);
        }
        console.log("22")

        const {HINHANH,...details} = req.body
        console.log(req.body)
        // // Tạo một document mới cho product
        const product = new HangHoa({
            ...details,
            HINHANH: imageUrls
        });
        console.log("33")
        
        // // Lưu document mới vào database
        const savedProduct= await product.save();
        console.log("44")
       
        
        const category = await Category.findOneAndUpdate(
            { name: req.body.LOAI },
            { $push: { products: savedProduct._id } },
            { new: true },
          );
        console.log(category)

        res.status(200).json(savedProduct);
      }catch(err){
        // nếu thêm thất bại thì xóa ảnh trên cloudinary
        for (let i = 0; i < arrayCloud.length; i++) {
            if (arrayCloud[i] && arrayCloud[i].public_id) {
                cloudinary.uploader.destroy(arrayCloud[i].public_id, { invalidate: true });
              }
        }
        next(err)
    }

}

export const updateProduct =async (req,res,next)=>{
    try{
        const product = await HangHoa.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json({
            sucess:true,
            data:product
        })
    }catch(err){
        next(err)
    }
}

export const getProducts = async(req,res,next)=>{
    try{
        const data = await HangHoa.find({})
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

export const getProduct = async(req,res,next)=>{
    try{
        const data= req.params.name 
        console.log(data)
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}