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

const router = Router();

router.post("/notes", validate(notePayloadSchema), addNoteHandler);
router.get("/notes", validateQuery(noteQuerySchema), getAllNotesHandler);
router.get("/notes/:id", getNoteByIdHandler);
router.put("/notes/:id", validate(noteUpdatePayloadSchema), editNotesByIdHandler);
router.delete("/notes/:id", deleteNotesByIdHandler);

export default router;