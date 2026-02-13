import { Router } from "express";
import {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNotesByIdHandler,
  deleteNotesByIdHandler,
} from "../controllers/note-controller.js";
import validate from "../../../middlewares/validate.js";
import { notePayloadSchema, noteUpdatePayloadSchema } from "../validator/schema.js";

const router = Router();

router.post("/notes", validate(notePayloadSchema), addNoteHandler);
router.get("/notes", getAllNotesHandler);
router.get("/notes/:id", getNoteByIdHandler);
router.put("/notes/:id", validate(noteUpdatePayloadSchema), editNotesByIdHandler);
router.delete("/notes/:id", deleteNotesByIdHandler);

export default router;