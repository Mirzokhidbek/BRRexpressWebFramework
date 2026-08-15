const express = require("express");
const app = express();
const http = require("http");

//mongoo db connection

 

// 1: Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2: Session code

// 3: Views code
app.set("views", "views");
app.set("view engine", "ejs");

// 4: Routing code

app.post("/create-item", (req, res) => {
    console.log(req.body);

    res.redirect("/");
});

app.get("/", function (req, res) {
    res.render("plans");
});

// Server
 

module.exports = app;