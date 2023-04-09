import  express  from "express";
import { createOrder, getAllOrders, updateOrder } from "../controllers/order.js";

const routerOrder  = express.Router()

routerOrder.get("/",getAllOrders)

routerOrder.post("/",createOrder)
routerOrder.put('/:id', updateOrder);
export default routerOrder