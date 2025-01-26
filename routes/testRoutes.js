import express from 'express'
import { testFunction, testFunction2 } from '../controller/testFunction.js'

const router=express.Router();

router.get('/',testFunction)
router.get('/test',testFunction2)

export default router;