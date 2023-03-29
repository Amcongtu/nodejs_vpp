import  express from "express";
import { getProducts,getProduct, createProduct } from './../controllers/product.js';

const routerProduct = express.Router();


routerProduct.get("/",getProducts)
routerProduct.get("/:name",getProduct)
routerProduct.post("/",createProduct)


export default routerProduct