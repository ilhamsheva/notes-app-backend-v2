import { Router } from "express";
import authenticationToken from "../../../middlewares/auth.js"
import { uploadImages } from "../controller/upload-controller.js";
import { upload } from "../storage/storage-config.js";

const router = Router();

router.post("/uploads/images", authenticationToken, upload.single('image'), uploadImages);

export default router;