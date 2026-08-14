console.log("Web server is running");
const express = require("express");
const app = express();
const http = require("http");
const PORT = 3000;

//start code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session code
//views code
app.set("views", "views");
app.set("view engine", "ejs");

//Routing code
app.get("/", (req, res) => {
    const products = [
        { name: 'Widget', description: 'A useful widget', price: 19.99 },
        { name: 'Gadget', description: 'A handy gadget', price: 29.99 },
        { name: 'Book', description: 'An interesting read', price: 9.99 }
    ];

    res.render("market", { products });
})
 
const server =  http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});