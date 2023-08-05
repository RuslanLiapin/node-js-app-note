"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteSchema = void 0;
exports.noteSchema = {
    content: {
        in: ['body'],
        errorMessage: 'Content is required',
        isString: true,
        notEmpty: true,
    },
    category: {
        in: ['body'],
        errorMessage: 'Category is required',
        isString: true,
        notEmpty: true,
        isIn: {
            options: [['Task', 'Random Thought', 'Idea']],
            errorMessage: 'Invalid category',
        },
    },
};
