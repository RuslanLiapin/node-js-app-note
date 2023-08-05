import { Note } from '../models/Note';

let notes: Note[] = [
  {
    id: 1,
    createdAt: new Date('2023-07-01 10:00'),
    content: 'Buy groceries for dinner.',
    category: 'Task',
    datesMentioned: ['2023-07-02', '2023-07-03'],
    archived: false,
  },
  {
    id: 2,
    createdAt: new Date('2023-07-01 10:00'),
    content: 'Buy deef for dinner.',
    category: 'Task',
    datesMentioned: ['2023-07-02', '2023-07-03'],
    archived: false,
  },
  {
    id: 3,
    createdAt: new Date('2023-07-01 10:00'),
    content: 'Buy eggs for dinner.',
    category: 'Task',
    datesMentioned: ['2023-07-02', '2023-07-03'],
    archived: false,
  },
];

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
