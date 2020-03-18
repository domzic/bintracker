import express from "express";

const router = express.Router();

router.get('/', () => console.log('stats'));

export default router;
