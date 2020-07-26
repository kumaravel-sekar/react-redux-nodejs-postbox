require("./db");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var postMessagesRoutes = require("./controllers/postMessageController");
var app = express();
app.use(bodyParser.json());
app.listen(4000, () => console.log("Servert started at 4000"));
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/postMessages", postMessagesRoutes);
