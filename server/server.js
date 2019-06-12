const express = require('express');
const path = require('path');
const fs = require('fs');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let info = [];
info.forEach


app.post('/contact-form', (req, res) => {
    // console.log(req.body.name);
    // console.log(req.body.email);
    fs.writeFile('./server/form.json', `${req.body.name} ${req.body.email}`, (err) => {
        if (err) console.log(err);
        res.setHeader('Content-Type', 'application/json');

        res.send('Your form has been submitted.');
    });
});

app.use(express.static(path.join(__dirname, '../public')));


app.listen(3000, () => {
    console.log('server running!');
});