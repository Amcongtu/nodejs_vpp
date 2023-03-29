import  express  from "express";
import { createCustomer, deleteCustomer, editCustomer, getCustomer, getCustomers } from "../controllers/customer.js";

const routeCustomer = express.Router();

// thêm khách hàng mới
routeCustomer.post("/",createCustomer)

// xóa khách hàng
routeCustomer.delete("/:id",deleteCustomer)

// sửa khách hàng
routeCustomer.put("/:id",editCustomer)

// lấy thông khách hàng
routeCustomer.get("/:id",getCustomer)

// lấy thông tin tất cả khách hàng
routeCustomer.get("/",getCustomers)

export default routeCustomer