// Product Router
import express, { Request, Response, Router } from 'express';
import { ProductController } from '../controllers/product.controller';


const router = Router();

router.get('/', ProductController.getPaginatedProducts);
router.get('/:id', ProductController.getProductById);


export const ProductRoute = router;
// export default router;


