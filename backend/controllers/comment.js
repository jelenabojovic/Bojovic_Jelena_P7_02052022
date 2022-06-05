const models = require("../models");
const fs = require("fs");
const jwt = require("jsonwebtoken");

/* Create a comment */

exports.createComment = (req, res, next) => {
    const commentObject = {
      User_id: req.auth.userId,
      content: req.body.content,
      Post_id: req.body.Post_id,
    };
    console.log(req.body);
    console.log("==========");
    if (req.body.content == undefined) {
      return res.status(400).json({
        message: "Votre commentaire est vide !"
      });
    }
    console.log(commentObject);
    models.Comment.create(commentObject)
  
      .then(() => res.status(201).json({
        message: "Commentaire publié !"
      }))
      .catch((error) => res.status(400).json({
        error
    }));
};

  /* Modify a comment */

exports.modifyComment = (req, res, next) => {
    models.Comment.findOne({
        where: {
          id: req.params.id
        }
      })
      .then((comment) => {
        if (comment.User_id !== req.auth.userId) {
          res.status(403).json({
            message: "vous n'êtes pas autorisé à modifier ce commentaire",
          });
        } else {
          const commentObject = {
            id: comment.id,
            User_id: comment.User_id,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
            content: req.body.content,
          };
  
          comment
            .update(commentObject)
            .then(() =>
              res.status(200).json({
                comment: commentObject,
                message: "Commentaire modifié !",
              })
            )
            .catch((error) => res.status(400).json(error));
        }
      })
      .catch((error) => res.status(500).json({
        error
    }));
};

/* Delete a comment */

exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const isAdmin = decodedToken.isAdmin;
    
    models.Comment.findOne({
      where: { 
        id: req.params.id },
      
      })
      .then(comment => {
          //comment deleted by user
         if (comment.User_id == req.auth.userId ) {
          models.Comment.destroy({ where: { id: req.params.id }})
            .then(() => res.status(201).json({ message: 'Commentaire supprimé !' }))
            .catch((error) => { res.status(403).json({ message: " Unauthorized request" + error })});
            //comment deleted by admin
        } else if (isAdmin) {
          models.Comment.destroy({ where: { id: req.params.id }})
            .then(() => res.status(201).json({ message: 'Commentaire supprimé par l\'administrateur !' }))
            .catch((error) => { res.status(400).json({ message: "Unauthorized request" + error })});
     };
  })
  .catch((error) => { res.status(500).json({ message: " erreur 500 - " + error })});
  };

  /* Get all comments */

exports.getAllComments = (req, res, next) => {
    models.Comment.findAll({
        where: {
          Post_id: req.params.id
        },
        order: [
          ["createdAt", "ASC"]
        ],
        attributes: ["id", "User_id", "Post_id", "content", "createdAt", "updatedAt"],
        include: [{
          model: models.User,
          attributes: ["id", "lastName", "firstName", "avatar"],
        }, ],
      })
      .then((comments) => res.status(200).json(comments))
      .catch((error) => {
        res.status(500).json(error);
      });
  };
  