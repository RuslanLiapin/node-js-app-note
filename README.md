# Node.js Note-taking App (`node-js-app-note`)

The Node.js Note-taking App is a simple application that allows users to create, view, update, and delete notes. The backend of the application is built using Node.js and Express.

## Features

- Create a new note with a content and category.
- View a list of all notes.
- View a specific note by its ID.
- Update the content and category of a note.
- Archive and unarchive notes.
- Delete a note.

## Usage
API Endpoints
GET /notes: Retrieve a list of all notes.
GET /notes/:id: Retrieve a specific note by its ID.
POST /notes: Create a new note.
Required JSON body: { "content": "Note content here", "category": "Task" }
PATCH /notes/:id: Update the content and category of a note.
Required JSON body: { "content": "Updated content", "category": "Updated category" }
DELETE /notes/:id: Delete a note by its ID.
