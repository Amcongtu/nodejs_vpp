import  express  from "express";
import { createOrder, deleteOrder, getAllOrders, updateOrder,getOrder } from "../controllers/order.js";

const routerOrder  = express.Router()

routerOrder.get("/",getAllOrders)
routerOrder.get("/:id",getOrder)

routerOrder.post("/",createOrder)
routerOrder.put('/:id', updateOrder);
routerOrder.delete('/:id', deleteOrder);
export default routerOrder