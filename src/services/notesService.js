"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = exports.getAllNotes = void 0;
var notesRepository = __importStar(require("../repositories/notesRepository"));
var getAllNotes = function () { return notesRepository.getAllNotes(); };
exports.getAllNotes = getAllNotes;
var getNoteById = function (id) {
    return notesRepository.getNoteById(id);
};
exports.getNoteById = getNoteById;
var createNote = function (note) {
    notesRepository.createNote(note);
};
exports.createNote = createNote;
var updateNote = function (id, updatedNote) {
    return notesRepository.updateNote(id, updatedNote);
};
exports.updateNote = updateNote;
var deleteNote = function (id) {
    return notesRepository.deleteNote(id);
};
exports.deleteNote = deleteNote;
