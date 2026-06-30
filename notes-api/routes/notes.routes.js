import { Router } from "express";
import { createNote, deleteNote, getByTags, getNote, getNotes, updateNote } from "../controllers/note.controller.js";

const notesRouter = Router();

notesRouter.get('/', getNotes);
notesRouter.get('/tags', getByTags);
notesRouter.get('/:id', getNote);
notesRouter.post('/', createNote);
notesRouter.put('/:id', updateNote);
notesRouter.delete('/:id', deleteNote);

export default notesRouter;