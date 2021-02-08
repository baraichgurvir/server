const express =  require('express');
const upload = require('express-fileupload');
const fs = require('fs');

var File, Filename;
var user = null;

const app = express();
app.use(upload());

app.get('/', (req, res) => {
    if (user === null) {
        res.redirect('/login');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.post('/', (req, res) => {
    if (req.files) {
        File = req.files.file;
        Filename = File.name;

        File.mv(__dirname + '/uploads/' + user + '/' + Filename, (err) => {
            if (err) {
                console.log("Error: " + err);
            } else {
                res.send("File Uploaded: Name: " + Filename);
            }
        });

    }
});

app.post('/browse', (req, res) => {
    (() => {
        res.redirect('http://301836049cb4.in.ngrok.io/' + user);
        res.end();
    })();
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});



app.get('/validate', (req, res) => {
    user = req.query.user;
    if (user === "Aman") {
        res.redirect('/');
    } else if (user === "Gurvir") {
        res.redirect('/');
    } else if (user === "Banraj") {
        res.redirect('/');
    } else if (user === "Harpreet") {
        res.redirect('/');
    } else {
        res.write("Error: No User Found");
        res.end();
    }
});

app.listen(80);