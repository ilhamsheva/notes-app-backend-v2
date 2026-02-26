import { Router } from "express";
import {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNotesByIdHandler,
  deleteNotesByIdHandler,
} from "../controllers/note-controller.js";
import validate from "../../../middlewares/validate.js";
import { notePayloadSchema, noteQuerySchema, noteUpdatePayloadSchema } from "../validator/schema.js";
import { validateQuery } from "../../../middlewares/validateQuery.js";
import authenticationToken from "../../../middlewares/auth.js";

const router = Router();

router.post("/notes", authenticationToken, validate(notePayloadSchema), addNoteHandler);
router.get("/notes", authenticationToken, validateQuery(noteQuerySchema), getAllNotesHandler);
router.get("/notes/:id", authenticationToken, getNoteByIdHandler);
router.put("/notes/:id", authenticationToken, validate(noteUpdatePayloadSchema), editNotesByIdHandler);
router.delete("/notes/:id", authenticationToken, deleteNotesByIdHandler);

export default router;