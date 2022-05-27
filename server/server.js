const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//serves html css and client js
app.use(express.static("server/public"));
// router for todo
let toDoRouter = require("./routes/todo.router");
app.use("/todo", toDoRouter);

//Start server on port
const PORT = 5000;
app.listen(PORT, () => {
  console.log("port running on", PORT);
});
