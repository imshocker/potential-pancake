const express = require('express');
const app = express();


const PORT = process.env.PORT || 3002;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require('./controllers/routes')(app);

app.listen(PORT, () => console.log('Now listening'));