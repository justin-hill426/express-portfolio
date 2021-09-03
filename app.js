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

app.use((req, res, next) => {
    console.error("404 error handler called...");
    const err = new Error();
    err.status = 404;
    err.message = "Looks like this page does not exist...";
    next(err);
});

app.use((err, req, res, next) => {
    console.error("Global error handler called");
    if (err.status === 404) {
        console.log("404 error... it looks like this page doesn't exist please try again with a different URL")
    } else {
        err.message = err.message || "Something went wrong on the server";
        console.log(err.message)
    }
    next();
});

app.listen(process.env.PORT || 3000, () =>
    console.log("App is running on port 3000.")
);