const path = require('path');
const fs = require('fs')
const uniqid = require('uniqid');



module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    app.post('/api/notes', (req, res) => {
        const dbData = fs.readFileSync('db/db.json');
        const db = JSON.parse(dbData);
        res.json(dbData);

        const userNote = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid(),
        };

        db.push(userNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db);

    });

    app.delete('/api/notes/:id', (req, res) => {
        const db = JSON.parse(fs.readFileSync('db/db.json'))

        let deleteNote = db.filter(item => item.id !== req.params.id);
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
        res.json(deleteNote);

    })

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });


    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    })
};
