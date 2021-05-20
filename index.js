const express = require("express");
const app = express();
const nocache = require("nocache");
const fs = require("fs");


app.set('views', __dirname + '/views');
app.set("view engine", "pug");
app.set('trust proxy', true);


app.use(express.static(__dirname + '/static'));

var confirmers = {};

app.get("/", (req, res) => {
    fs.readFile(__dirname + "/susd.txt", "utf8", (err, data) => {
        res.render("home", {
            count: data
        });
    });
});

app.get("/susd", (req, res) => {
    confirmers[req.ip] = true;

    if (Object.keys(confirmers).length > 1) {
        confirmers = {};
        fs.readFile(__dirname + "/susd.txt", "utf8", (err, data) => {
            if (err) res.send(err);
            fs.writeFile(__dirname + "/susd.txt", "" + (parseInt(data) + 1), err => {
                console.log(err);
                res.send("");
            });
        });
    } else {
        res.send("");
    }

    
});

app.get("/livesus", (req, res) => {
    fs.readFile(__dirname + "/susd.txt", "utf8", (err, data) => {
        res.send({
            count: data,
            accused: confirmers[req.ip] === true
        });
    });
});

app.get("/notsus", (req, res) => {
    confirmers[req.ip] = false;
    fs.readFile(__dirname + "/susd.txt", "utf8", (err, data) => {
        res.send({
            count: data,
            accused: confirmers[req.ip] === true
        });
    });
});

app.get("/forcesus", (req, res) => {
    fs.readFile(__dirname + "/susd.txt", "utf8", (err, data) => {
        if (err) res.send(err);
        fs.writeFile(__dirname + "/susd.txt", "" + (parseInt(data) + 1), err => {
            res.send(data);
        });
    });
});

app.get("/forceunsus", (req, res) => {
    fs.readFile(__dirname + "/susd.txt", "utf8", (err, data) => {
        if (err) res.send(err);
        fs.writeFile(__dirname + "/susd.txt", "" + (parseInt(data) - 1), err => {
            res.send(data);
        });
    });
});

app.get("*", (req, res) => {
    res.send("Sus link.");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));