// Imports
const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require ("cors");

const Sequelize = require("sequelize");
// Express
const app = express();

 //Routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

// Connection to database MySQL
const sequelize = new Sequelize("groupomania", "root", process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connecté à la base de données MySql");
} catch (error) {
  console.error("Impossible de se connecter à la base de données:", error);
}

app.use(express.json());
app.use(cors());

 //Middleware
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;