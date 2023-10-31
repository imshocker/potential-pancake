const path = require('path');
const fs = require('fs')
const uniqid = require('uniqid');



module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    app.post('/api/notes', (req, res) => {
        const db = fs.readFileSync('db/db.json');
        db = JSON.parse(db);
        res.json(db);

        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid(),
        };

        db.push(newNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db);

    });

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
      });
    

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
      })
};
