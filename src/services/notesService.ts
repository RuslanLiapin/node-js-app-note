import * as notesRepository from '../repositories/notesRepository';
import { Note } from '../models/Note';

export const getAllNotes = (): Note[] => notesRepository.getAllNotes();

export const getNoteById = (id: number): Note | undefined =>
  notesRepository.getNoteById(id);

export const createNote = (note: Note): void => {
  notesRepository.createNote(note);
};

export const updateNote = (id: number, updatedNote: Note): boolean => {
  return notesRepository.updateNote(id, updatedNote);
};

export const deleteNote = (id: number): boolean => {
  return notesRepository.deleteNote(id);
};
