import express from "express";
import { addCategory } from "../controller/categoryController.js";

const router = express.Router();

// Define POST route for adding a category
router.post('/addcategory', addCategory);

export default router;
