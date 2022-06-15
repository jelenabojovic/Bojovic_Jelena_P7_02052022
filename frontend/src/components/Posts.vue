<template>
  <main  class="container-fluid form-custom-color-white pt-5">     
    <section class="mx-lg-5 pb-4" >
     <!-- Posts feed -->
      <article
       v-for="(post, index) in allPosts"
       v-bind:key="post.id"
       class="card mx-auto col-md-7 col-lg-6 border-0 p-0 mb-4 shadow-lg">
        <div class="card-body">
          <div class="d-flex justify-content-between"> 

            <div class="text-dark">
              <!-- User info -->
              <div class="d-flex align-items-center" >
                <img
                v-if="post.User.avatar != null"
                class="rounded-circle imageprofil" 
                :src ="`http://localhost:3000/images/users/${post.User.avatar}`"
                alt="Photo de profil de l'utilisateur qui poste" />
                <img
                class="rounded-circle imageprofil "
                alt="Photo de profil par défaut"
                v-else
                src="../assets/avatar.png" />
              </div>

              <div class="text-start ps-2" aria-label="nom prénom de l'utilisateur">
                  <p class="card-text my-0">
                    {{ post.User.lastName }} {{ post.User.firstName }}
                  </p>

                  <p class="card-text text-muted"> publié le
                  {{
                    post.createdAt.split("T")[0].split("-").reverse().join("/") +
                   " à " +
                   post.createdAt.split("T")[1].split(":").slice(0, -1).join(":")
                  }}
                 </p>
              </div>
            </div>


              <!-- Button delete posts -->
            <div>
              <button
              v-if=" userData.data.userId == post.User_id || userData.data.isAdmin == true"
              type="button"
              role="button"
              aria-label="Supprimer post"
              class="btn"
               @click="deletePost(post.id)" >
              <font-awesome-icon class="fa" icon="trash-alt" alt="Supprimer post" />
              </button>

              <!-- Button modify post -->
              <button
               v-if=" userData.data.userId == post.User_id "
              type="button"
              role="button"
              class="btn"
              aria-label="Modifier post"
              data-bs-toggle="modal"
              :data-bs-target="`#exampleModal${index}`">
              <font-awesome-icon class="fa" icon="edit" alt="Édit post" />
              </button>
            </div>

          </div>
          <p class="card-text text-start mt-4">
            <p v-if="post.content">{{ post.content }}</p>
          </p>
        </div>
        <img
        v-if="post.image != null"
        :src="`http://localhost:3000/images/posts/${post.image}`"
        class="card-img-bottom principal--color"
        alt="" />
        
        <!-- post modification window -->
        <div
        class="modal fade"
        :id="'exampleModal'+index" tabindex="-1"
        aria-hidden="true"
        v-if=" userData.data.userId == post.User_id ">

          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title h4">
                  Modifiez votre post
                </h4>
                <button
                type="button"
                role="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close">
                </button>
              </div>

              <div class="modal-body">
                <form enctype="multipart/form-data" aria-label="Formulaire envoi nouveau post">
                  <div class="mb-3">
                  <!--  modification post field-->
                    <textarea
                    class="form-control"
                    v-model="postModified.content"
                    placeholder="Modifier mon post…"
                    aria-label="Champs modifier le post">
                    </textarea>
                  </div>

                  <!-- choose image field -->
                  <div class="mb-3">
                    <label class="input-group-text my-3 btn-outline-dark labelimagepost--custom">
                      Choisir image
                      <input
                      aria-label="Choisir image post"
                      class="form-control form-control-sm ms-3"
                      type="file"
                      name="image"
                      accept=".jpg, .jpeg, .gif, .png"
                       @change="onFileSelected"/>
                    </label>
                  </div>
                </form>
              </div>
         <!--cancellation button-->
              <div class="modal-footer">
                <button
                type="button"
                class="btn btn-secondary rounded-pill"
                data-bs-dismiss="modal"
                aria-label="Annuler changement">
                  Annuler
                </button>

                <!-- Post sending button -->
                <button
                v-if="postModified.content !== '' || postModified.image !== ''"
                 @click.prevent="editPost(post.id), reload()"
                 type="button"
                 role="button"
                 class="btn btn-dark align-items-center rounded-pill"
                 aria-label="Enregister modification du post">
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Comments -->
        <Comments
        aria-label="les commentaires"
        :postId="post.id"
        :post="post"
        @reloadPosts="getAllPosts" />

      </article>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import Comments from "../components/Comments.vue";

export default {
    name: "Posts",
    components: {
      Comments
    },
    data() {
    return {
      userData: { data: {} },
      user: {
        lastName: "",
        firstName: "",
        avatar: "",
        userId: "",
      },
      allPosts: [],
      postModified: {},
    };
},
mounted() {
    this.getAllPosts();
    this.createUserData();
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
    editPost(postId) {
      console.log(postId);
      let formData = new FormData();
      if (this.postModified.content) {
        formData.append("content", this.postModified.content);
      }
      if (this.postModified.image) {
        formData.append("image", this.postModified.image);
      }
      console.log("test", formData.get("content"));
      console.log("test", formData.get("image"));
      axios
        .put("http://localhost:3000/api/posts/" + postId, formData, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.postModified = "";
          location.reload();
        })
        .catch((error) => console.log(error));
    },
    deletePost(postId) {
      if (
        window.confirm("Etes-vous sûr de vouloir supprimer votre publication ?")
      ) {
        axios
          .delete("http://localhost:3000/api/posts/" + postId, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            alert("Publication supprimée !");
            this.getAllPosts();
          })
          .catch((error) => console.log(error));
      }
    },
    onFileSelected(event) {
      console.log(event);
      this.postModified.image =
        event.target.files[0] || event.dataTransfer.files;
      console.log(this.postModified.image);
    },
  }
}
</script>

<style scoped>
.imageprofil {
object-fit: cover;
height: 40px;
width: 40px;
}
</style>