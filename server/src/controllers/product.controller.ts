import { Request , Response } from "express";
import { ProductServices } from "../services/ProductService.service";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";


const getPaginatedProducts = async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
        const skip = req.query.skip ? parseInt(req.query.skip as string, 10) : 0;

        const products = await ProductServices.getAllProducts({ limit, skip });

        res.status(200).send(new ApiResponse(200,  'Products fetched successfully', products));
    } catch (error) {
        console.log("Error Occured While Getting Paginated Products");
        console.log({ Error: error });
        res.status(500).send(new ApiError(500,"Internal Server Error", "Error fetching products"));
    }
}

const getProductById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send(new ApiError(400, "Invalid product ID", "Bad Request"));
        }

        const product = await ProductServices.getProductBuId(id);
        if (!product) {
            return res.status(404).send(new ApiError(404, "Product not found", "Not Found"));
        }

        res.status(200).send(new ApiResponse(200, 'Product fetched successfully', product));
    } catch (error) {
        console.log("Error Occured While Getting Product By ID");
        console.log({ Error: error });
        res.status(500).send(new ApiError(500, "Internal Server Error", "Error fetching product By Id"));
    }
}


export const ProductController = { getPaginatedProducts, getProductById };