require("dotenv").config();

const express = require("express");
const app = express();
const insight = require(__dirname + "/insight.js");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
    insight.getData.then(function(data) {
        res.render("display", {
            currentSol: data[data.length-1],
            insightData: data
        });
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});