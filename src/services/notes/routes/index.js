import { Router } from "express";
import {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNotesByIdHandler,
  deleteNotesByIdHandler,
} from "../controllers/note-controller.js";

const router = Router();

router.post("/notes", addNoteHandler);
router.get("/notes", getAllNotesHandler);
router.get("/notes/:id", getNoteByIdHandler);
router.put("/notes/:id", editNotesByIdHandler);
router.delete("/notes/:id", deleteNotesByIdHandler);

export default router;
