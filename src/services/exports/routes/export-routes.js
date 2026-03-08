import { Router } from "express";
import validate from "../../../middlewares/validate.js";
import authenticationToken from "../../../middlewares/auth.js";
import { exportPayloadSchema } from "../validator/export-schema.js";
import { exportNotes } from "../controller/export-controller.js";

const router = Router();

router.post("/export/notes", authenticationToken, validate(exportPayloadSchema), exportNotes);

export default router;