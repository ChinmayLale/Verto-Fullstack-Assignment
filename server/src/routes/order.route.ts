// Order Router
import express, { Request, Response, Router } from 'express';
import { OrderController } from '../controllers/order.controller';

const router = Router();





router.post('/', OrderController.placeOrderController);




export const OrderRoute = router;
