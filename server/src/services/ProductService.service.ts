import { products } from "../constants/products";
import { Product } from "../models/Product";

interface getAllProductsParams {
    limit?: number;
    skip?: number;
}


const getAllProducts = async ({limit=10,skip=0}:getAllProductsParams): Promise<Product[]> => {
    try {
        if(skip<0) skip=0;
        if(limit<1) limit=1;

        const paginatedProducts = products.slice(skip, skip + limit);
        return paginatedProducts;
    } catch (error) {
        console.log("Error Occured While Getting Paginated Products");
        console.log({Error:error});
        throw error;
    }
}

const getProductBuId = async (id:number): Promise<Product | null> => {
    try {
        const product = products.find(p => p.id === id) || null;
        return product;
    } catch (error) {
        console.log("Error Occured While Getting Product By ID");
        console.log({Error:error});
        throw error;
    }
}



export const ProductServices = { getAllProducts , getProductBuId };