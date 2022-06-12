const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
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
              process.env.JWTTOKEN, {
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

    /* Password modification */

exports.modifyPassword = (req, res, next) => {
  const oldPassword = req.body.oldPassword
  const password = req.body.password
  models.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((user) => {
      if (user.dataValues.id !== req.auth.userId) {
        res.status(403).json({
          message: "vous n'êtes pas autorisé à modifier ce profil",
        });

      } else if (password) {
        bcrypt.compare(oldPassword, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({
                message: "Mot de passe incorrect !"
              });
            } else {

              if (!passwordSchema.validate(password)) {
                return res.status(400).json({
                  message: "Le mot de passe ne doit pas contenir d'espace et doit avoir une longueur entre 8 et 20 caractères contenant au minimum 1 chiffre, 1 minuscule et 1 majuscule !",
                });
              } else {

                bcrypt.hash(password, 10)
                  .then(hash => {
                    user.update({
                        password: hash
                      }, {
                        where: {
                          id: req.params.id
                        }
                      })
                      .then(() =>
                        res.status(200).json({
                          message: "Mot de passe modifié !",
                        })
                      )
                      .catch((error) => res.status(400).json(error));
                  })
              }
            }
          })
          .catch((error) => res.status(500).json({
            error
          }));
      }
    })
};

/* User's profile modification */

exports.modifyUser = (req, res, next) => {

  models.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((user) => {
      if (user.dataValues.id !== req.auth.userId) {
        res.status(403).json({
          message: "vous n'êtes pas autorisé à modifier ce profil",
        });
      } else {
        const userObject = {
          userId: user.id,
          isAdmin: user.isAdmin,
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          email: req.body.email,
          service: req.body.service,
          avatar: user.avatar,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

        if (req.file) {
          if (user.avatar) {
            console.log(user.avatar);
            fs.unlink(`images/users/${user.avatar}`, () => {});
          }
          userObject.avatar = req.file.filename;
        }

        user
          .update(userObject)
          .then(() =>
            res.status(200).json({
              data: {
                userId: user.id,
                isAdmin: user.isAdmin,
                lastName: user.lastName,
                firstName: user.firstName,
                email: user.email,
                service: user.service,
                avatar: user.avatar,
                createdAt: user.createdAt,
              },
              message: " Profil modifié !",
            })
          )
          .catch((error) => res.status(400).json(error));
      }
    })
    .catch((error) => res.status(500).json({
      error
    }));
};

/* Delete user's profil */

exports.deleteUser = (req, res, next) => {
  console.log("delete")
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const isAdmin = decodedToken.isAdmin;
  models.User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id','avatar']
    })
    .then(user => {
        // Delete user's profile by a user or admin
        console.log ("user delete", user.dataValues.id, req.auth.userId)
        if (user.dataValues.id == req.auth.userId || isAdmin) {
            // Check if user exists
            console.log("user id")
            if (!user) {
                return res.status(409).json({ error: 'Id non valide !' });
                // Delete an image if there is one
            } else {
                if(user.avatar) {
                    const filename = user.avatar;
                    fs.unlinkSync(`images/users/${filename}`);
                    console.log('avatar supprimé')
                }

                let message = "Utilisateur supprimé";

                if(isAdmin) {
                    message = "Utilisateur supprimé par l'admin";
                }
                models.Post.destroy ({ where: { User_id: req.params.id }})
                    .then (() => {
                        models.Comment.destroy ({ where: { User_id: req.params.id }})
                            .then (() => {
                                models.User.destroy ({ where: { id: req.params.id }})
                                    .then(() => res.status(201).json({ message: message }))
                                    .catch((error) => { res.status(400).json({ message: " erreur 400 - " + error })});
                            })
                    })
                    .catch((error) => {
                        res.status(500).json({ message: " erreur 500 - " + error })
                    });
            }
        }
    });
}