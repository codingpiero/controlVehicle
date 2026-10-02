import express from "express";
import { create,list,getPhoto,get,remove,update } from "./controller.js";

const router = express.Router();

router.put('/:id',update);
router.delete('/:id',remove);
router.get('/:id/photo',getPhoto);
router.get('/:id',get);
router.get('/',list);
router.post('/',create);

export default router;