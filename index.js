const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const app = express();
const route = require("./routes/router");

mongoose
  .connect("mongodb://localhost:27017/paypakka", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(res => {
    console.log("Connected to Database Successfully.");
  })
  .catch(() => {
    console.log("Conntection to database failed.");
  });
mongoose.set("useFindAndModify", false);

mongoose.connection.on("conneted", () => {
  console.log("mongoDB connection at the port 27017");
});

mongoose.connection.on("error", err => {
  console.log(err);
});

const port = 1000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use("/paypakka", route);
app.get("/", (req, res) => {
  res.send("server create");
});
app.listen(port, () => {
  console.log("server has been connect at port" + port);
});