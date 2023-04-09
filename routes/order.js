import  express  from "express";
import { createOrder, deleteOrder, getAllOrders, updateOrder } from "../controllers/order.js";

const routerOrder  = express.Router()

routerOrder.get("/",getAllOrders)

routerOrder.post("/",createOrder)
routerOrder.put('/:id', updateOrder);
routerOrder.delete('/:id', deleteOrder);
export default routerOrder