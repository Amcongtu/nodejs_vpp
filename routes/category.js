import  express  from "express";
import { createCategory, getCategories, getCategory, getListHangHoaByDanhMuc } from './../controllers/Category.js';
const routerCategory = express.Router()

// tạo mới một danh mục văn phòng phẩm 
routerCategory.post("/",createCategory)
routerCategory.get("/:name",getCategory)
routerCategory.get("/:id/products",getListHangHoaByDanhMuc)

routerCategory.get("/",getCategories)

export default routerCategory