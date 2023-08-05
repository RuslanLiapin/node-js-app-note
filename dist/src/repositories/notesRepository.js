"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = exports.getAllNotes = void 0;
let notes = [];
const getAllNotes = () => notes;
exports.getAllNotes = getAllNotes;
const getNoteById = (id) => notes.find((note) => note.id === id);
exports.getNoteById = getNoteById;
const createNote = (note) => {
    notes.push(note);
};
exports.createNote = createNote;
const updateNote = (id, updatedNote) => {
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes[index] = updatedNote;
        return true;
    }
    return false;
};
exports.updateNote = updateNote;
const deleteNote = (id) => {
    const initialLength = notes.length;
    notes = notes.filter((note) => note.id !== id);
    return notes.length !== initialLength;
};
exports.deleteNote = deleteNote;
