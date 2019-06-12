const express = require('express');
const path = require('path');
const fs = require('fs');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));


app.post('/contact-form', (req, res) => {
    fs.appendFile('./server/form.json', JSON.stringify({ 'Name': `${req.body.name}`, 'Email': `${req.body.email}` }, null, 2), (err) => {
        if (err) console.log(err);
        res.send('Your form has been submitted.');
    });
});

app.get('/formsubmissions', (req, res) => {
    fs.readFile(path.join(__dirname, './server/form.json'), (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            let submits = JSON.parse(data);
            submits.push(req.body);
            res.send(submits);
        }
    })
})

app.listen(3000, () => {
    console.log('server running!');
});