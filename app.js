const express = require('express');
const data = require("./data.json")

const app = express();

app.set("view engine", "pug")
app.use("/static", express.static("public"))

app.get("/", (req, res) => {
    res.locals.projects = data.projects;
    res.render("index");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(process.env.PORT || 3000, () =>
    console.log("App is running on port 3000.")
);