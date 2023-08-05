import { Schema } from 'express-validator';

export const noteSchema: Schema = {
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
