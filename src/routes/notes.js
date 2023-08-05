"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var notesService = __importStar(require("../services/notesService"));
var validationHelper_1 = require("../helpers/validationHelper");
var categories = ['Task', 'Random Thought', 'Idea'];
exports.router = express_1.default.Router();
exports.router.get('/', function (req, res) {
    var allNotes = notesService.getAllNotes();
    res.json(allNotes);
});
exports.router.get('/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var note = notesService.getNoteById(id);
    if (note) {
        res.json(note);
    }
    else {
        res.status(404).json({ message: 'Note not found' });
    }
});
exports.router.post('/', (0, express_validator_1.checkSchema)(validationHelper_1.noteSchema), function (req, res) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var content = req.body.content;
    if (!content) {
        return res.status(400).json({ message: 'Content cannot be empty' });
    }
    var datesMentioned = extractDatesFromContent(content);
    var newNote = __assign(__assign({ id: Date.now(), createdAt: new Date(), datesMentioned: datesMentioned }, req.body), { archived: false });
    notesService.createNote(newNote);
    res.status(201).json(newNote);
});
exports.router.patch('/:id', (0, express_validator_1.checkSchema)(validationHelper_1.noteSchema), function (req, res) {
    var id = parseInt(req.params.id);
    var existingNote = notesService.getNoteById(id);
    if (!existingNote) {
        return res.status(404).json({ message: 'Note not found' });
    }
    var updatedContent = req.body.content;
    if (!updatedContent) {
        return res.status(400).json({ message: 'Content cannot be empty' });
    }
    var updatedDatesMentioned = extractDatesFromContent(updatedContent);
    var updatedCategory = req.body.category;
    if (!categories.includes(updatedCategory)) {
        return res.status(400).json({ message: 'Invalid category' });
    }
    var updatedNote = __assign(__assign({}, existingNote), { content: updatedContent, category: updatedCategory, datesMentioned: updatedDatesMentioned });
    if (notesService.updateNote(id, updatedNote)) {
        res.json(updatedNote);
    }
    else {
        res.status(500).json({ message: 'Failed to update note' });
    }
});
exports.router.delete('/:id', function (req, res) {
    var id = parseInt(req.params.id);
    if (notesService.deleteNote(id)) {
        res.status(204).send();
    }
    else {
        res.status(404).json({ message: 'Note not found' });
    }
});
function extractDatesFromContent(content) {
    var dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{2}\.\d{2}\.\d{4}\b/g;
    return content.match(dateRegex) || [];
}
