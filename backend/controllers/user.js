const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");
const fs = require("fs");
const emailValidator = require("email-validator");

const passwordSchema = new passwordValidator();
passwordSchema
  .is()
  .min(8)
  .is()
  .max(50)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

  /*Signup*/
  exports.signup = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const service = req.body.service;

    if (
        firstName == null ||
        lastName == null ||
        email == null ||
        password == null ||
        service == null
      ) {
        return res.status(400).json({
          message: "champ(s) manquant(s)"
        });
    }
    if (!emailValidator.validate(req.body.email)) {
        return res
          .status(401)
          .json({ message: "Veuillez entrer une adresse email valide" });
      }
      if (!passwordSchema.validate(password)) {
        return res.status(400).json({
          message: "Le mot de passe ne doit pas contenir d'espace et doit avoir une longueur entre 8 et 20 caractères contenant au minimum 1 chiffre, 1 minuscule et 1 majuscule !",
        });
    }
    models.User.findOne({
        where: {
          email: req.body.email
        }
      }).then((result) => {
        if (result) {
          res.status(409).json({
            message: "Cet email est déjà utilisé"
          });
        } else {
          bcrypt
            .hash(password, 10)
            .then((hash) => {
              const UserObject = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                service: req.body.service,
                isAdmin: req.body.isAdmin,
              };
              models.User.create(UserObject).then((result) => {
                res.status(201).json({
                  message: "Utilisateur créé !"
                });
              });
            })
            .catch((error) => {
              res.status(500).json({
                message: "something went wrong",
              });
            });
        }
      });
    };

/* Login */

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    models.User.findOne({
        where: {
          email: email
        }
      })
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({
              message: "Cet email n'est associé à aucun compte !"
            });
        }
  
        bcrypt.compare(password, user.password).then((valid) => {
          if (!valid) {
            return res.status(401).json({
              message: "Mot de passe incorrect"
            });
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            lastName: user.lastName,
            firstName: user.firstName,
            email: user.email,
            service: user.service,
            avatar: user.avatar,
            createdAt: user.createdAt,
            token: jwt.sign({
                userId: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
                lastName: user.lastName,
                firstName: user.firstName,
                service: user.service,
                avatar: user.avatar,
                createdAt: user.createdAt
              },
              "RANDOM_TOKEN_SECRET", {
                expiresIn: "24h"
              }
            ),
          });
        });
      })
      .catch((error) => res.status(500).json({
        message: error.message
      }));
  };

  /* Get all users */
  
  exports.getAllUsers = (req, res, next) => {
      models.User.findAll()
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(400).json({
          error
        }));
    };
    
    /* Get one user */
    
    exports.getOneUser = (req, res, next) => {
      models.User.findOne({
          where: {
            id: req.params.id
          }
        })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(404).json({
          error
        }));
    };
    
        