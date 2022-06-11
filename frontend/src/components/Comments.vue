<template>  
  <article>
    <section class="gap-3 mb-3 mt-3">
      <!-- Show comments button -->
      <button
      type="button"
      role="button"
      @click.prevent="showComments(postId)"
      class="btn btn-outline-secondary me-2 mt-2"
      aria-label="Bouton commentaires"
      data-bs-toggle="collapse"
      :data-bs-target="`#afficheCommentaires${postId}`"
      aria-expanded="true">
        <font-awesome-icon
        class="fa me-2"
        icon="comments"
        alt="Commentaires" />
        Commentaires
      </button>

      <!-- Write comment button -->
      <button
      type="button"
      role="button"
      class="btn btn-outline-secondary mt-2"
      data-bs-toggle="modal"
      aria-label="Bouton commenter"
      :data-bs-target="`#ModalCommentaire${postId}`">
        <font-awesome-icon
        class="fa me-2"
        icon="comment"
        alt="Commenter" />
        Commenter
      </button>
    </section>

    <!-- Show comments -->
    <div v-for="(comment, index) in post.Comments"
    v-bind:key="comment.id">
      <section class="collapse"
      :id="`afficheCommentaires${postId}`">
        <div class="m-3 rounded-3 shadow-sm pe-1">
          <div class="d-flex justify-content-between">

            <!-- Info of person who wrote comments -->
            <div  class="d-flex align-items-center accordion-body">
              <div>
              <img
                class="rounded-circle imageprofil"
                alt="Photo de profil de l'utilisateur qui commente"
                v-if="comment.User && comment.User.avatar != null"
                :src="`http://localhost:3000/images/users/${comment.User.avatar}`"/>
              <img
                class="rounded-circle imageprofil "
                alt="Photo de profil par défaut"
                v-else
                src="../assets/avatar.png"/>
              </div>
            </div>
              
            <span class="text-start ps-2">
                {{ comment.User.lastName }} {{ comment.User.firstName }}
            </span>
              <p class="comment_createdAt font-italic">
              le
              {{
              comment.createdAt.split("T")[0].split("-").reverse().join("/") +
              " à " +
              comment.createdAt.split("T")[1].split(":").slice(0, -1).join(":")
              }}
            </p>

            <!-- Edit/delete comments button -->
            <div>
              <button
              v-if=" userData.data.userId == comment.User_id || userData.data.isAdmin == true "
              type="button"
              role="button"
              aria-label="Supprimer commentaire"
              class="btn text-secondary"
              @click.prevent="deleteComment(comment.id)">
                <font-awesome-icon
                class="fa-sm"
                icon="trash-alt"
                alt="Supprimer commentaire" />
              </button>

              <button v-if="userData.data.userId == comment.User_id "
              type="button"
              role="button"
              aria-label="Éditer commentaire"
              class="btn text-secondary"
              data-bs-toggle="modal"
              :data-bs-target="`#modifierCommentaire${index}`">
                  <font-awesome-icon
                  class="fa-sm"
                  icon="edit"
                  alt="Modifier commentaire" />
              </button>
            </div>
          </div>
          <!-- Post content -->
          <p class="text-start pb-2 ms-4"> {{ comment.content }}</p> 
        </div>
      </section>
    </div>

    <!-- If there is no comments -->
    <p
     :id="`afficheCommentaires${postId}`"
    v-if="!post.Comments.length" 
    class="collapse m-3">
      Aucun commentaire
    </p>
  
 <!-- Writing a comment -->
    <section
    class="modal fade"
    :id="`ModalCommentaire${postId}`"
    tabindex="-1"
    aria-hidden="true">

      <section class="modal-dialog">
        <div  class="modal-content">
          <div class="modal-header">
            <h5
            class="modal-title"
            id="commentaireLabel">
            Mon commentaire
            </h5>

            <button
            type="button"
            role="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
            </button>
          </div>

          
          <div class="modal-body py-5">
            <textarea
            class="form-control"
            id="message-text-commentaire"
            v-model="this.comment.content"
            placeholder="Écrire un commentaire…"
            aria-label="Créer un commentaire…" />
          </div>

          <div class="modal-footer">
            <button
            type="button"
            role="button"
            aria-label="Fermer la fenêtre"
            class="btn btn-secondary rounded-pill"
            data-bs-dismiss="modal">
            Fermer
            </button>

            <!-- Send new comment button -->
            <button
            v-if="comment.content !== ''"
            type="button"
            role="button"
            aria-label="Créer commentaire"
            class="btn btn-dark rounded-pill"
            @click.prevent="createComment(postId)">
              <font-awesome-icon
              icon="paper-plane"
              alt="Envoyer" />
            </button>

            <button
            v-else
            type="button"
            role="button"
            aria-label="Créer commentaire bouton désactiver"
            class="btn btn-dark rounded-pill"
            disabled>
              <font-awesome-icon
              icon="paper-plane"
              alt="Envoyer" />
            </button>
            
          </div>
        </div>
      </section>
    </section>

    <!-- Modify comments -->
    <div
    v-for="(comment, index) in post.Comments"
    v-bind:key="comment.id"
    class="modal fade"
    :id="'modifierCommentaire'+index"
    tabindex="-1"
    aria-labelledby="Modification commentaire"
    aria-hidden="true">

      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"
            id="TitreLabelModifierCommentaire">
            Modifiez mon commentaire
            </h5>
            <button
            type="button"
            role="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
            </button>
          </div>

        
          <div class="modal-body">
            <form enctype="multipart/form-data">
              <div class="mb-3">
                <label
                for="modification-commentaire"
                class="col-form-label">
                Mon nouveau commentaire :
                </label>
                <textarea
                class="form-control"
                id="modification-commentaire"
                v-model="commentModified.content"
                placeholder="Modifier mon commentaire…">
                </textarea>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <!-- Cancel or send posts button -->
            <button
            type="button"
            role="button"
            class="btn btn-secondary rounded-pill"
            data-bs-dismiss="modal">
            Annuler
            </button>

            <button
            v-if="commentModified.content !== ''"
            @click.prevent="editComment(comment.id)"
            type="button"
            role="button"
            class="btn btn-dark align-items-center rounded-pill">
            Enregistrer
            </button>

            <button
            v-else
            type=" submit"
            role="button"
            class="btn btn-dark align-items-center rounded-pill"
            disabled>
            Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import axios from "axios";

export default {
    name: "Comments",
    props: ["postId", "post"],
    data() {
      return {
      userData: { data: {} },
      user: {
        userId: "",
        isAdmin: "false",
      },
      
        comments:[],
        comment: {
        id: "",
        content: "",
        userId: "",
        createdAt: "",
        postId: "",
        updatedAt: "",
      },
        commentModified: {},
        displayComments: false,
      }
      },

    mounted() {
    this.createUserData(), this.getAllPosts();
    },
    methods: {
    getAllPosts() {
      axios
        .get("http://localhost:3000/api/posts/")
        .then((response) => {
          if (response.data.length > 0) {
            this.allPosts = response.data;
            console.log(response);
          } else {
            console.log("Il n'y a pas encore de publication.");
          }
        })
        .catch((error) =>
          console.log(error + "Echec lors de la récupération des publications.")
        );
    },
    reload() {
        setTimeout("window.open(self.location, '_self');", 2000);
    },
    createUserData() {
      if (localStorage.getItem("user")) {
        try {
          this.userData = JSON.parse(localStorage.getItem("user"));
        } catch (e) {
          localStorage.removeItem("user");
          console.log("Données corrompues");
        }
      }
    },
    showComments(postId) {
        axios
        .get('http://localhost:3000/api/comment/' + postId, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
        .then((response) => {
        this.comments = response.data.comments;
        })
        .catch((error) => console.log(error));
    },
    createComment() {
      console.log(this.postId, this.comment);
     if (this.comment.content == null  || this.comment.content == "" )
       {
        let msgReturn = document.getElementById("msgError");
        msgReturn.classList.add("text-danger");
        this.msgError = "Rien à publier";
      } else {
        axios
          .post("http://localhost:3000/api/comment/", { content: this.comment.content, Post_id: this.postId }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            this.comment.content = "";
            this.$emit("reloadPosts")
          })
          .catch((error) => console.log(error));
      }
    },
    editComment(commentId) {
      console.log(commentId);
      axios
        .put("http://localhost:3000/api/comment/" + commentId, { content: this.commentModified.content }, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.commentModified = "";
          this.$emit("reloadPosts")
        })
        .catch((error) => console.log(error));
    },
    deleteComment(commentId) {
      if (
        window.confirm("Etes-vous sûr de vouloir supprimer votre commentaire ?")
      ) {
        axios
          .delete("http://localhost:3000/api/comment/" + commentId, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            alert("Commentaire supprimé !");
            this.$emit("reloadPosts")
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>


<style scoped>
.imageprofil {
object-fit: cover;
height: 40px;
width: 40px;
}
</style>

