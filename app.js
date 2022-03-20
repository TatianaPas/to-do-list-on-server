const express = require('express');
const bobyParser = require('body-parser');
const date = require(__dirname+"/date.js");

const app = express();
const items = ["Read 10 pages", "Write 10 lines of code"];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bobyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  let day = date.getDate();

  res.render('list', {
    listTitle: day,
    newListItems: items
  });
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work",
    newListItems: workItems
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }



});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
