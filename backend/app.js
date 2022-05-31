// Imports
const express = require("express");
const path = require("path");
require("dotenv").config();

const Sequelize = require("sequelize");
// Express
const app = express();

 //Routes
const userRoutes = require("./routes/user");
//const postRoutes = require("./routes/post");
//const commentRoutes = require("./routes/comment");

// Connexion BDD
const sequelize = new Sequelize("groupomania", "root", "**JB!fr!2022", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connecté à la base de données MySql");
} catch (error) {
  console.error("Impossible de se connecter à la base de données:", error);
}

// erreur de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(express.json());

 //Middleware
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
//app.use("/api/post", postRoutes);
//app.use("/api/comment", commentRoutes);

module.exports = app;