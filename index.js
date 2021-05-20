const express = require("express");
const app = express();
const nocache = require("nocache");

app.use(nocache());

app.set('views', __dirname + '/views');
app.set("view engine", "pug");
app.set('trust proxy', true);


app.use(express.static(__dirname + '/static'));

var count = 0;
var confirmers = {};

app.get("/", (req, res) => {
    res.render("home", {
        count: count
    });
});

app.get("/susd", (req, res) => {
    confirmers[req.ip] = true;

    if (Object.keys(confirmers).length > 1) {
        confirmers = {};
        count += 1;
    }

    res.end();
});

app.get("/livesus", (req, res) => {
    res.send({
        count: count,
        accused: confirmers[req.ip] === true
    });
});

app.get("/notsus", (req, res) => {
    confirmers[req.ip] = false;
    res.send({
        count: count,
        accused: confirmers[req.ip] === true
    });
});

app.get("*", (req, res) => {
    res.send("Sus link.");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));