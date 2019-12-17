const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./db/connection");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
  }
});

const items = require("./routes/api/items");
const newItem = require("./routes/api/newItem");
const editItem = require("./routes/api/editItem");
const upload = require("./routes/api/upload");

app.use('/images', express.static(path.join(__dirname, 'public/uploads/images')));
app.use("/api/items", items);
app.use("/api/new", newItem);
app.use("/api/edit", editItem);
app.use("/api/upload", upload);
app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
