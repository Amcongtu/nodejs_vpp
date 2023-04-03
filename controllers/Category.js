import Category from "../models/Category.js";
import cloudinary from 'cloudinary';
import Product from "../models/Product.js";

export const createCategory = async(req,res,next)=>{
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

  try {
    // console.log(req.body)
        // Upload ảnh banner lên Cloudinary
        const resultBannerPhoto = await cloudinary.uploader.upload(req.body.imageBanner, { folder: process.env.CLOUD_FODER_CATEGORIES_BANNER});

        const resultImage = await cloudinary.uploader.upload(req.body.image, { folder: process.env.CLOUD_FODER_CATEGORIES });
        const {name,description} = req.body
        
        // // Tạo một document mới cho category
        const newCategory = new Category({
        //   name: req.body.name,
        //   description: req.body.description,
          name,
          description,
          image:resultImage.secure_url,
          bannerImage: resultBannerPhoto.secure_url
        });
    
        // // Lưu document mới vào database
        const savedCategory = await newCategory.save();
    
        res.status(200).json(savedCategory);
      }catch(err){

        // nếu thêm thất bại thì xóa ảnh trên cloudinary
        if (resultBannerPhoto && resultBannerPhoto.public_id) {
          cloudinary.uploader.destroy(resultBannerPhoto.public_id, { invalidate: true });
        }
        if (resultImage && resultImage.public_id) {
          cloudinary.uploader.destroy(resultImage.public_id, { invalidate: true });
        }
        next(err)
    }
}

export const updateCategory = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

  try {
    const { id } = req.params;

    // Tìm danh mục theo id
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    // Upload ảnh banner lên Cloudinary nếu có
    let resultBannerPhoto;
    if (req.body.imageBanner) {
      resultBannerPhoto = await cloudinary.uploader.upload(req.body.imageBanner, {
        folder: process.env.CLOUD_FODER_CATEGORIES_BANNER,
      });
      // Xóa ảnh banner cũ trên Cloudinary nếu có
      if (category.bannerImage && category.bannerImage !== resultBannerPhoto.secure_url) {
        cloudinary.uploader.destroy(category.bannerImage.split("/").pop().split(".")[0], { invalidate: true });
      }
    }

    // Upload ảnh lên Cloudinary nếu có
    let resultImage;
    if (req.body.image) {
      resultImage = await cloudinary.uploader.upload(req.body.image, {
        folder: process.env.CLOUD_FODER_CATEGORIES,
      });
      // Xóa ảnh cũ trên Cloudinary nếu có
      if (category.image && category.image !== resultImage.secure_url) {
        cloudinary.uploader.destroy(category.image.split("/").pop().split(".")[0], { invalidate: true });
      }
    }

    // Cập nhật thông tin mới cho danh mục
    category.name = req.body.name || category.name;
    category.description = req.body.description || category.description;
    category.image = resultImage?.secure_url || category.image;
    category.bannerImage = resultBannerPhoto?.secure_url || category.bannerImage;

    // Lưu danh mục đã được cập nhật vào database
    const savedCategory = await category.save();

    res.status(200).json(savedCategory);
  } catch (err) {
    // Xóa ảnh mới nếu thêm thất bại
    if (resultBannerPhoto && resultBannerPhoto.public_id) {
      cloudinary.uploader.destroy(resultBannerPhoto.public_id, { invalidate: true });
    }
    if (resultImage && resultImage.public_id) {
      cloudinary.uploader.destroy(resultImage.public_id, { invalidate: true });
    }
    next(err);
  }
};
export const deleteCategoryById = async(req, res, next) => {
  const { id } = req.params;
  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });
  
  try {
    // Tìm danh mục cần xóa
    const categoryToDelete = await Category.findById(id);

    // Kiểm tra xem danh mục có tồn tại không
    if (!categoryToDelete) {
      const error = new Error('Không tìm thấy danh mục');
      error.statusCode = 404;
      throw error;
    }

    // Xóa ảnh của danh mục trên Cloudinary
    await cloudinary.uploader.destroy(categoryToDelete.image.split("/").pop().split(".")[0], { invalidate: true });
    await cloudinary.uploader.destroy(categoryToDelete.bannerImage.split("/").pop().split(".")[0], { invalidate: true });

    // Xóa danh mục trong database
    await Category.findByIdAndRemove(id);

    res.status(200).json({ message: 'Xóa danh mục thành công' });
  } catch (err) {
    next(err);
  }
};

export const getCategory = async(req,res,next)=>{
    try{
      const category = await Category.findOne({name:req.params.name})
      if(!category){
        res.status(404).json("Category is not exist.")
      }
      res.status(200).json(category)
    }catch(err){
      next(err)
    }
}

export const getCategories = async(req,res,next)=>{
  try{
    const categories = await Category.find({})
    res.status(200).json(categories)
  }catch(err){
    next(err)
  }
}

export const getListHangHoaByDanhMuc = async (req, res,next) => {
  try {
    
    const danhMucName = req.params.id; // Lấy ID của danh mục từ URL
    const danhMuc = await Category.findOne({name:danhMucName}); // Tìm kiếm danh mục
    if (!danhMuc) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }
    const products = danhMuc.products; // Lấy danh sách sản phẩm thuộc danh mục
    const hangHoa = await Product.find({ _id: { $in: products } }); // Tìm kiếm sản phẩm
    res.status(200).json(hangHoa);
  } catch (error) {
    next(error)
  }
};