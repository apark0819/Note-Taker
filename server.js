//Dependencies
const PORT = process.env.PORT || 3001;
const express = require("express");
const path = require("path");
const fs = require('fs');
const total = require('./develop/db/db.json');
//Setting up Express App
const app = express();


//Setting up the data parsing for express.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Routes
app.get('/api/notes', (_req, res) =>{
    res.json(total.slice(1));
});

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (_req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//New Note Function
function newNotes(body, notes) {
    const newNote = body;
    if (!Array.isArray(notes))
        notes = [];
    
    if (notes.length === 0)
        notes.push(0);

    body.id = notes[0];
    notes[0]++;

    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    return newNote;
}

//POST route
app.post('/api/notes', (req, res) => {
    const newNote = newNotes(req.body, total);
    res.json(newNote);
  });

//Delete function
  function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];
  
        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
  
            break;
        }
    }
  }

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, total);
    res.json(true);
});
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  