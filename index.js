const express = require("express");
const app = express();
const fs = require("fs");


app.set('views', __dirname + '/views');
app.set("view engine", "pug");
app.set('trust proxy', true);


app.use(express.static(__dirname + '/static'));

var data = {
    warzk: {
        confirmers: {},
        count: 61
    },
    b0kch01: {
        confirmers: {},
        count: 0
    },
    kardic: {
        confirmers: {},
        count: 0
    },
    tonofclay: {
        confirmers: {},
        count: 0
    },
    foreskinfarmer: {
        confirmers: {},
        count: 0
    },
    turtle: {
        confirmers: {},
        count: 0
    },
    seyonijam: {
        confirmers: {},
        count: 0
    },
    child_predator: {
        confirmers: {},
        count: 0
    }
};

function getSusCount(person) {
    if (!data[person]) return 0;
    return data[person].count || 0;
}

function isConfirmed(person, ip) {
    if (!data[person] || !data[person].confirmers)
        return false;
    return data[person].confirmers[ip] === true;
}

function confirm(person, ip) {
    if (data[person] && data[person].confirmers)
        data[person].confirmers[ip] = true;
}

function unconfirm(person, ip) {
    if (data[person] && data[person].confirmers)
        data[person].confirmers[ip] = false;
}

function resetConfirms(person) {
    if (data[person])
        data[person].confirmers = {};
}

function addCount(person) {
    if (!data[person]) return 0;
        return ++data[person].count;
}

function minCount(person) {
    if (!data[person]) return 0;
        return --data[person].count;
}

app.get("/", (req, res) => {
    res.render("home", {
        count: getSusCount("warzk")
    });
});

app.get("/susd/:person", (req, res) => {
    const person = req.params.person;
    confirm(person, req.ip);

    if (data[person]) {
        if (Object.keys(data[person].confirmers).length > 1) {
            resetConfirms(person);
            addCount(person);
        }
    }
    
    res.send("Done!");
});

app.get("/livesus/:person", (req, res) => {
    const person = req.params.person;
    res.send({
        count: getSusCount(person),
        accused: isConfirmed(person, req.ip)
    });
});

app.get("/notsus/:person", (req, res) => {
    const person = req.params.person;
    unconfirm(person, req.ip);
    res.send({
        count: getSusCount(person),
        accused: isConfirmed(person, req.ip)
    });
});

app.get("/forcesus/:person", (req, res) => {
    const person = req.params.person;
    res.send(addCount(person));
});

app.get("/forceunsus/:person", (req, res) => {
    const person = req.params.person;
    res.send(minCount(person));
});

app.get("*", (req, res) => {
    res.send("Sus link.");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));