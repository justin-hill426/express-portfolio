const express = require('express');
const data = require("./data.json");

const app = express();

app.set("view engine", "pug");
app.use("/static", express.static("public"));

//serves the main route
app.get("/", (req, res) => {
    res.locals.projects = data.projects;
    res.render("index");
});

//serves the 'about' app
app.get("/about", (req, res) => {
    res.render("about");
});

//serves the project id route to see a specific project and corresponding information
app.get("/project/:id", (req, res, next) => {
    res.locals.projects = data.projects;
    const id = parseInt(req.params.id);

    if (data.projects[id] != undefined) {
        res.render("project", {id})
    }
    else {
        const error = new Error();
        error.status = 404;
        error.message = "This project does not exist. Please try again with a valid project ID";
        console.error(error.message);
        next(error);
    }
});

app.listen(process.env.PORT || 3000, () =>
    console.log("App is running on port 3000.")
);