import express, { Application, Request, Response } from 'express';
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();

router.get('/', (req, res) => {
	res.send('Hello from the API');
})



export default router;