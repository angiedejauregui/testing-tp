const express = require("express");
const cors = require("cors");
const db = require("./database/db");
const dotenv = require("dotenv").config();

const controllers = require("./controllers");
const verifyToken = require("./middlewares/verifyToken");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/user", verifyToken, controllers.getUserById);
app.post("/register", controllers.register);
app.post("/login", controllers.login);
app.post("/forgot-password", controllers.forgotPassword);
app.post("/reset-password/:token", controllers.resetPassword);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`SERVER FUNCIONANDO EN EL PUERTO ${PORT}`);
  db();
});

module.exports = app;
