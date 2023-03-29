import  express  from "express";
import { createCategory, getCategories, getCategory } from './../controllers/Category.js';
const routerCategory = express.Router()

// tạo mới một danh mục văn phòng phẩm 
routerCategory.post("/",createCategory)
routerCategory.get("/:name",getCategory)
routerCategory.get("/",getCategories)

export default routerCategory