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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const notesService = __importStar(require("../services/notesService"));
const validationHelper_1 = require("../helpers/validationHelper");
const categories = ['Task', 'Random Thought', 'Idea'];
exports.router = express_1.default.Router();
exports.router.get('/', (req, res) => {
    const allNotes = notesService.getAllNotes();
    res.json(allNotes);
});
exports.router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const note = notesService.getNoteById(id);
    if (note) {
        res.json(note);
    }
    else {
        res.status(404).json({ message: 'Note not found' });
    }
});
exports.router.post('/', (0, express_validator_1.checkSchema)(validationHelper_1.noteSchema), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const content = req.body.content;
    if (!content) {
        return res.status(400).json({ message: 'Content cannot be empty' });
    }
    const datesMentioned = extractDatesFromContent(content);
    const newNote = Object.assign(Object.assign({ id: Date.now(), createdAt: new Date(), datesMentioned }, req.body), { archived: false });
    notesService.createNote(newNote);
    res.status(201).json(newNote);
});
exports.router.patch('/:id', (0, express_validator_1.checkSchema)(validationHelper_1.noteSchema), (req, res) => {
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
    const updatedNote = Object.assign(Object.assign({}, existingNote), { content: updatedContent, category: updatedCategory, datesMentioned: updatedDatesMentioned });
    if (notesService.updateNote(id, updatedNote)) {
        res.json(updatedNote);
    }
    else {
        res.status(500).json({ message: 'Failed to update note' });
    }
});
exports.router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (notesService.deleteNote(id)) {
        res.status(204).send();
    }
    else {
        res.status(404).json({ message: 'Note not found' });
    }
});
function extractDatesFromContent(content) {
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{2}\.\d{2}\.\d{4}\b/g;
    return content.match(dateRegex) || [];
}
