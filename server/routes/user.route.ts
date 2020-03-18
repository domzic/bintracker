import express from "express";

const router = express.Router();

router.get('/', () => console.log('user'));

export default router;
