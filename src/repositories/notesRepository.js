"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = exports.getAllNotes = void 0;
var notes = [];
var getAllNotes = function () { return notes; };
exports.getAllNotes = getAllNotes;
var getNoteById = function (id) {
    return notes.find(function (note) { return note.id === id; });
};
exports.getNoteById = getNoteById;
var createNote = function (note) {
    notes.push(note);
};
exports.createNote = createNote;
var updateNote = function (id, updatedNote) {
    var index = notes.findIndex(function (note) { return note.id === id; });
    if (index !== -1) {
        notes[index] = updatedNote;
        return true;
    }
    return false;
};
exports.updateNote = updateNote;
var deleteNote = function (id) {
    var initialLength = notes.length;
    notes = notes.filter(function (note) { return note.id !== id; });
    return notes.length !== initialLength;
};
exports.deleteNote = deleteNote;
