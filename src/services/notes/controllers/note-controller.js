import { nanoid } from "nanoid";
import notes from "../notes.js";
import response from "../../../utils/response.js";
import { AuthorizationError, InvariantError, NotFoundError } from "../../../exceptions/index.js";
import noteRepositories from "../repositories/note-repositories.js";

// Handler for NOTES
const addNoteHandler = async (req, res, next) => {
  const { title, tags, body } = req.validated;
  const owner = req.user.username;

  console.log('req.user.id:', req.user.id);
  console.log('owner:', owner);

  const note = await noteRepositories.createNote({
    title,
    body,
    tags,
    owner
  });

  if (!note) {
    return next(new InvariantError("Catatan gagal ditambahkan"));
  }

  return response(res, 201, 'Catatan berhasil ditambahkan', note);
};

// GET ALL NOTES
const getAllNotesHandler = async (req, res, next) => {
  // Req user for auth
  const owner = req.user;
  // Add req query
  const {title} = req.query;

  const notes = await noteRepositories.getAllNotes(owner);

  if (title !== '') {
    const note = notes.filter((note) => note.title === title);
    return response(res, 200, "success", {notes: note});
  }

  return response(res, 200, 'Catatan sukses ditampilkan', notes);

};

const getNoteByIdHandler = async (req, res, next) => {
  const { id } = req.params;
    // Req user for auth
  const owner = req.user;

  const isOwner = await noteRepositories.verifyNoteOwner(owner);

  if (!isOwner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses catatan ini'));
  }

  const note = await noteRepositories.getNoteById(id);

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }
 
  return response(res, 200, 'Catatan sukses ditampilkan', note);
};

const editNotesByIdHandler = async (req, res, next) => {
  const { id } = req.params;

  const {title, body, tags} = req.validated;

  const owner = req.user;

  const isOwner = await noteRepositories.verifyNoteOwner(owner);

  if (!isOwner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses catatan ini'));
  }

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

  const owner = req.user;

  const isOwner = await noteRepositories.verifyNoteOwner(owner);

  if (!isOwner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses catatan ini'));
  }

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
