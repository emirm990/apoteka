const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./db/connection");
const path = require("path");
const isAuth = require("./auth");
const sessionActive = require("./sessionActive");
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const app = express();



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  name: 'sid',
  secret: 'supersecretstring',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    sameSite: true,
    secure: false
  }
})
)
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
const login = require("./routes/api/login");
const logout = require("./routes/api/logout");
const currentSession = require("./routes/api/session");
const unauthorized = require("./routes/api/unauthorized");

app.use('/images', express.static(path.join(__dirname, 'public/uploads/images')));
app.use("/api/items", items);
app.use("/api/new", isAuth.isAuthorized, newItem);
app.use("/api/edit", isAuth.isAuthorized, editItem);
app.use("/api/upload", isAuth.isAuthorized, upload);
app.use("/api/login", sessionActive.sessionActive, login);
app.use("/api/session", isAuth.isAuthorized, currentSession);
app.use("/api/logout", logout);
app.use("/api/unauthorized", unauthorized);
app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
