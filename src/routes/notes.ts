import express, { Request, Response } from 'express';
import { validationResult, checkSchema } from 'express-validator';
import * as notesService from '../services/notesService';
import { noteSchema } from '../helpers/validationHelper';
import { Note } from '../models/Note';

const categories = ['Task', 'Random Thought', 'Idea'];

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const allNotes = notesService.getAllNotes();
  res.json(allNotes);
});

router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const note = notesService.getNoteById(id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

router.post('/', checkSchema(noteSchema), (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const content = req.body.content;
  if (!content) {
    return res.status(400).json({ message: 'Content cannot be empty' });
  }

  const datesMentioned = extractDatesFromContent(content);

  const newNote: Note = {
    id: Date.now(),
    createdAt: new Date(),
    datesMentioned,
    ...req.body,
    archived: false,
  };

  notesService.createNote(newNote);
  res.status(201).json(newNote);
});

router.patch('/:id', checkSchema(noteSchema), (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const existingNote = notesService.getNoteById(id);

  if (!existingNote) {
    return res.status(404).json({ message: 'Note not found' });
  }

  const updatedContent = req.body.content;
  if (!updatedContent) {
    return res.status(400).json({ message: 'Content cannot be empty' });
  }

  const updatedDatesMentioned = extractDatesFromContent(updatedContent);

  const updatedCategory = req.body.category;
  if (!categories.includes(updatedCategory)) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  const updatedNote: Note = {
    ...existingNote,
    content: updatedContent,
    category: updatedCategory,
    datesMentioned: updatedDatesMentioned,
  };

  if (notesService.updateNote(id, updatedNote)) {
    res.json(updatedNote);
  } else {
    res.status(500).json({ message: 'Failed to update note' });
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (notesService.deleteNote(id)) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

function extractDatesFromContent(content: string): string[] {
  const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{2}\.\d{2}\.\d{4}\b/g;

  return content.match(dateRegex) || [];
}
