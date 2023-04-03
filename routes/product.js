import  express from "express";
import { getProducts,getProduct, createProduct, getProductsPagination } from './../controllers/product.js';

const routerProduct = express.Router();

routerProduct.get("/products",getProductsPagination)
routerProduct.get("/",getProducts)
routerProduct.get("/:name",getProduct)
routerProduct.post("/",createProduct)



export default routerProduct