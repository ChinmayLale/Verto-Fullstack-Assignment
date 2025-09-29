import { Request , Response } from "express";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import { Product } from "../models/Product";
import { ProductServices } from "../services/ProductService.service";
import { Order } from "../models/Order";
import { OrderService } from "../services/OrderService.service";


const placeOrderController = async (req: Request, res: Response) => {
    try {
        // Simulate order placement logic
        const {productIds} = req.body;
        if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).send(new ApiError(400, "Invalid product IDs", "Bad Request"));
        }

        //Get Products from Product Service
        let Products:Product[] = [];

        for(const id of productIds){
            const product = await ProductServices.getProductBuId(id);
            if(product) Products.push(product);
        }
        if(Products.length===0){
            return res.status(404).send(new ApiError(404, "No valid products found for the given IDs", "Not Found"));
        }

        const order:Order = await OrderService.createOrderService(Products);
        OrderService.printOrderDetails(order);

        res.status(201).send(new ApiResponse(201, 'Order placed successfully', order));
    } catch (error) {
        console.log("Error Occured While Placing Order");
        console.log({ Error: error });
        res.status(500).send(new ApiError(500, "Internal Server Error", "Error placing order"));
    }
}




export const OrderController = { placeOrderController };