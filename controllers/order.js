
import DonHang from '../models/Order.js';
import HangHoa from '../models/Product.js';
export const createOrder = async(req,res,next)=>{
    try {
        const { customer, products,diachi,sdt } = req.body;
    
        // Check if the customer exists
      
    
        // Check if all the products exist and calculate the total cost of the order
        let total = 0;
        const productIds = products.map(p => p.product);
        const existingProducts = await HangHoa.find({ _id: { $in: productIds } });
        if (existingProducts.length !== productIds.length) {
          return res.status(400).json({ message: 'Invalid product ID(s)' });
        }
        products.forEach(p => {
          const existingProduct = existingProducts.find(ep => ep._id.equals(p.product));
          total += existingProduct.DONGIA * p.quantity;
        });
    
        // Create a new order and save it to the database
        const order = new DonHang({ customer, products, total,diachi,sdt });
        await order.save();
    
        res.status(201).json(order);
      } catch (err) {
        next(err)
      }
}


export const getAllOrders = async (req, res, next) => {
    try {
      const orders = await DonHang.find({});
    //   console.log(orders)
      return res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }


  export const updateOrder = async (req, res, next) => {
    
    try {
      console.log("111111111111")
      const { id } = req.params;
      const { customer, products } = req.body;
  
      // Check if the order exists
      const order = await DonHang.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Check if all the products exist and calculate the total cost of the order
      let total = 0;
      const productIds = products.map(p => p.product);
      const existingProducts = await HangHoa.find({ _id: { $in: productIds } });
      // console.log(existingProducts)

      if (existingProducts.length !== productIds.length) {
        return res.status(400).json({ message: 'Invalid product ID(s)' });
      }
      products.forEach(p => {
        // console.log(p.product._id)
        // let objectId = 'new ObjectId("64245e497f658a676c905692")';
        // let regex = /"([^"]*)"/; // Biểu thức chính quy để tìm chuỗi trong dấu nháy ""
        const existingProduct = existingProducts.find(ep => String(ep._id) == String(p.product._id));
        // console.log(existingProduct)
        total += existingProduct.DONGIA * p.quantity;
      });
      // .match(regex)[0].equals(p.product)
  
      // Update the order and save it to the database
      order.customer = customer;
      order.products = products;
      order.total = total;
      order.status= req.body.status
      await order.save();
  
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  }

  export const deleteOrder = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Check if the order exists
       await DonHang.findByIdAndDelete(id)
     
      // Delete the order

  
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
  export const getOrder = async(req,res,next)=>{
    try{
      const order = await DonHang.findById(req.params.id).populate('products.product');
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    }
    catch(err){
      next()
    }

  }