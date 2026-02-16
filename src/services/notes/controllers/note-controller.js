import { nanoid } from "nanoid";
import notes from "../notes.js";
import response from "../../../utils/response.js";
import { ClientError, InvariantError, NotFoundError } from "../../../exceptions/index.js";
import noteRepositories from "../repositories/note-repositories.js";

// Handler for NOTES
const addNoteHandler = async (req, res, next) => {
  const { title, tags, body } = req.validated;

  const note = await noteRepositories.createNote({
    title,
    body,
    tags
  });

  if (!note) {
    return next(new InvariantError("Catatan gagal ditambahkan"));
  }

  return response(res, 201, 'Catatan berhasil ditambahkan', note);
};

// GET ALL NOTES
const getAllNotesHandler = async (req, res, next) => {
  // Add req query
  const {title} = req.query;

  const notes = await noteRepositories.getAllNotes();

  if (title !== '') {
    const note = notes.filter((note) => note.title === title);
    return response(res, 200, "success", {notes: note});
  }

  return response(res, 200, 'Catatan sukses ditampilkan', notes);

};

const getNoteByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  const note = await noteRepositories.getNoteById(id);

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }
 
  return response(res, 200, 'Catatan sukses ditampilkan', note);
};

const editNotesByIdHandler = async (req, res, next) => {
  const { id } = req.params;

  const {title, body, tags} = req.validated;

  const updatedNote = await noteRepositories.editNoteById({
    id,
    title,
    body,
    tags
  });

  if (!updatedNote) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil diperbarui', updatedNote);
};

const deleteNotesByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  const deletedNote = await noteRepositories.deleteNoteById(id);

  if (!deletedNote) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }
 
  return response(res, 200, 'Catatan berhasil dihapus', deletedNote);
};

export {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNotesByIdHandler,
  deleteNotesByIdHandler,
};
