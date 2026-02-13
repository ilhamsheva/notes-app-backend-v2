import { nanoid } from "nanoid";
import notes from "../notes.js";
import response from "../../../utils/response.js";
import { ClientError, InvariantError, NotFoundError } from "../../../exceptions/index.js";

// Handler for NOTES
const addNoteHandler = (req, res, next) => {
  const { title, tags, body } = req.validated;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  // Indikator success
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (!isSuccess) {
    // *Ini adalah middleware*
    return next(new InvariantError("Catatan gagal ditambahkan"));
  }

  // Response setelah ditambahkan middleware
  return response(res, 201, "Catatan berhasil ditambahkan", { noteId: id });
};

// GET ALL NOTES
const getAllNotesHandler = (req, res, next) => {
  // Response setelah ditambahkan middleware
  return response(res, 200, "Berhasil mengambil semua catatan", {
    data: notes,
  });
};

const getNoteByIdHandler = (req, res, next) => {
  const { id } = req.params;
  const note = notes.find((n) => n.id === id);

  // *Ini adalah middleware*
  if (!note) {
    return next(new NotFoundError("Catatan tidak ditemukan"));
  }

  // Response setelah ditambahkan middleware
  return response(res, 200, "Berhasil mengambil catatan", { data: note });
};

const editNotesByIdHandler = (req, res, next) => {
  const { id } = req.params;

  if (!req.body) {
    return next(new ClientError("Request body is required"));
  }

  const { title, tags, body } = req.validated;

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    // Response setelah ditambahkan middleware
    return next(new NotFoundError("Catatan tidak ditemukan"));
  }

  const updatedAt = new Date().toISOString();
  notes[index] = { ...notes[index], title, tags, body, updatedAt };
  return response(res, 200, "Catatan berhasil diperbarui", { data: notes[index] });
};

const deleteNotesByIdHandler = (req, res, next) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }
 
  notes.splice(index, 1);
  return response(res, 200, 'Catatan berhasil dihapus');
};

export {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNotesByIdHandler,
  deleteNotesByIdHandler,
};
