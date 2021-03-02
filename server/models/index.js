const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/solo", { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); // eslint-disable-line
db.once("open", function () {
  console.log("DB connected"); // eslint-disable-line
});

module.exports = mongoose;
