import { Note } from '../models/Note';

let notes: Note[] = [];

export const getAllNotes = (): Note[] => notes;

export const getNoteById = (id: number): Note | undefined =>
  notes.find((note) => note.id === id);

export const createNote = (note: Note): void => {
  notes.push(note);
};

export const updateNote = (id: number, updatedNote: Note): boolean => {
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = updatedNote;
    return true;
  }
  return false;
};

export const deleteNote = (id: number): boolean => {
  const initialLength = notes.length;
  notes = notes.filter((note) => note.id !== id);
  return notes.length !== initialLength;
};
