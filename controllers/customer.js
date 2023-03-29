import Customer from "../models/Customer.js";
export const createCustomer = async(req,res,next)=>{
    const newCustomer = new Customer(req.body);
    try{
        const saveCustomer = await newCustomer.save()
        res.status(200).json({
            success:true,
            data:saveCustomer,

        })
    }catch(err){
        next(err);
    }
}
export const getCustomer = async(req,res,next)=>{
    try{
        const customer = await Customer.find(req.params.id);
        res.status(200).json({
            success:true,
            message:"Get infomation customer id: "+req.params.id+" is successfully.",
            data:customer
        });
    }catch(err){
        next(err)
    }
}
export const getCustomers = async(req,res,next)=>{
    try{
        const customer = await Customer.find();
        res.status(200).json({
            success:true,
            data:customer,
            message:"Get infomation all customer are successfully.",

        });
    }catch(err){
        next(err)
    }
}
export const editCustomer = async(req,res,next)=>{
    try{
        
        const customer = await Customer.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true})
        res.status(200).json({
            success:true,
            data:customer
        })
    }catch(err){
        next(err)
    }
}

export const deleteCustomer = async(req,res,nex)=>{
    try{
        await Customer.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message: "Customer has been deleted."
        })
    }catch(err){
        next(err)
    }
}