const express = require('express');
const path = require('path');
const fs = require('fs');

let app = express();

const dataPath = path.join(__dirname, './form.json');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.post('/contact-form', (req, res) => {
    fs.readFile(dataPath, (err, data) => {
        if (err) console.log(err);
        let submits = JSON.parse(data);
        console.log(req.body);
        submits.push(req.body);
        fs.writeFile(dataPath, JSON.stringify(submits, null, 2), (err) => {
            if (err) console.log(err);
            res.send('Cheers! You will soon be bombarded with loads of spam.');
        })
    });
});

app.get('/formsubmissions', (req, res) => {
    fs.readFile(dataPath, (err, data) => {
        if (err) {
            console.log(err.response);
            res.sendStatus(500);
        } else {
            let submits = JSON.parse(data);
            res.send(submits);
        }
    })
})

app.listen(3000, () => {
    console.log('server running!');
});

