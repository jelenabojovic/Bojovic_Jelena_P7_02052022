<template>
  <main>
    <section class="container card my-5 py-5">
      <div class="row">
        <article class="col-md-5 d-flex justify-content-center align-items-center">
          <!-- User avatar -->
          <div>
            <img class="user-avatar rounded-circle mr-2 " alt=" profil avatar"
            v-if="currentUser.avatar != null"
            :src="`http://localhost:3000/images/users/${currentUser.avatar}`"/>
            <div v-else>
              <img class="user-avatar rounded-circle mr-2" src="../assets/avatar.png"  />
            </div>
            <!-- Modify photo button -->
            <div>
            <button
            v-if=" currentUser.id === localStorageUserId"
            type="button"
            role="button"
            class="btn btn-dark rounded-pill"
            data-bs-toggle="collapse"
            data-bs-target="#editImage"
            aria-label="Modifier image">
              Modifier image
            </button>
           <!--Choose image input-->
            <form
            class="collapse fade"
            id="editImage"
            aria-labelledby="Modification image profil"
            aria-hidden="true">
              <label class="input-group-text my-3 mx-2 btn-outline-dark labelimagepost--custom">
                Choisir image
                <input
                id=" avatar"
                class="form-control form-control-sm ms-3"
                type="file"
                name="image"
                accept=".jpg, .jpeg, .gif, .png" 
                @change ="onFileSelected" />
              </label>

              <button type="button" role="button" aria-label="Validation envoi avatar" class="btn btn-outline-dark me-2 rounded-pill"
              @click.prevent="modifyAvatar(), reload()">
                Valider
              </button>
            </form>
          </div>
         </div>
       </article>

        <!-- USER INFO -->
        <section class="col-md-7 border-start">
          <div class="card-body">
            <!-- Last name modification -->
            <div class="d-flex">
              <h2 class="h6 text-start mb-0 d-flex align-items-center">
                <strong> Nom </strong>
              </h2>
              <!--button for last name modification input-->
              <button
              v-if=" currentUser.id === localStorageUserId"
              class="btn rounded-pill p-0 ms-2"
              type="button"
              role="button"
              aria-label="Edit nom"
              @click="inputLastNameHidden=!inputLastNameHidden">
              <font-awesome-icon class="fa-sm text-black-50" icon="edit" alt="Edit Nom" />
              </button>
            </div>
            <!--User's last name-->
            <p class="card-text text-start"> {{ currentUser.lastName }} </p>
            <!--Input for last name modification-->
            <form
             id="editNom"
             aria-labelledby="Modification nom" >
              <div class="d-flex mb-3" v-if="inputLastNameHidden==false">
               <input
                class="form-control form-control-sm me-3"
                type="text"
                name="nom"
                v-model="userModified.lastName"
                aria-label="Champs Nom"
                pattern="(-?([A-Z].\s)?([A-Z][a-z]+)\s?)+([A-Z]'([A-Z][a-z]+))?"
                required/>
              <!--Last name modification button-->
                <button
                @click="modifyLastName()"
                type="button"
                role="button"
                aria-label="Envoi nouveau nom"
                class="btn btn-outline-dark rounded-pill">
                  <font-awesome-icon class="fa-sm" icon="check" alt="Modifier nom" />
                </button>
              </div>
            </form>

            <!-- First name modification -->
            <div class="d-flex">
              <h3 class="h6 text-start mb-0 d-flex align-items-center">
                <strong> Prénom </strong>
              </h3>
            <!--Button for first name modification input-->
              <button
              v-if=" currentUser.id === localStorageUserId"
              class="btn rounded-pill p-0 ms-2"
              type="button"
              role="button"
              aria-label="Modifier prénom"
              @click="inputFirstNameHidden=!inputFirstNameHidden">
              <font-awesome-icon class="fa-sm text-black-50" icon="edit"  alt="Edit Prénom" />
              </button>
            </div>
              <!--User's first name-->
            <p class="card-text text-start"> {{ currentUser.firstName }}</p>
              <!--Input for first name modification-->
            <form
             id="editPrenom"
             aria-labelledby="Modification prénom">
              <div class="d-flex mb-3" v-if="inputFirstNameHidden==false">
                <input
                class="form-control form-control-sm me-3"
                type="text"
                name="prenom"
                aria-label="Champs modification prénom"
                v-model="userModified.firstName"
                pattern="[A-Za-zÀ-ÖØ-öø-ÿ-]{2,15}"
                required />
              <!--First name modification button-->
                <button
                 @click="modifyFirstName()"
                type="button"
                role="button"
                aria-label="Modifer prénom envoi"
                class="btn btn-outline-dark rounded-pill">
                  <font-awesome-icon  class="fa-sm"  icon="check" alt="Edit prénom" />
                </button>
              </div>
            </form>

            <!-- Email modification -->
            <div class="d-flex">
              <h3 class="h6 text-start mb-0 d-flex align-items-center">
                <strong> Email </strong>
              </h3>
             <!--Button for email modification input-->
              <button 
              v-if=" currentUser.id === localStorageUserId"  
              class="btn rounded-pill p-0 ms-2"
              type="button"
              role="button"
              aria-label="Afficher modification email"
               @click="inputEmailHidden=!inputEmailHidden">
                <font-awesome-icon class="fa-sm text-black-50" icon="edit" alt="Edit email" />
              </button>
            </div>
              <!--User's email-->
             <p class="card-text text-start"> {{ currentUser.email }} </p>
             <!--Input for email modification-->
            <form
             id="editEmail"
             aria-labelledby="Modification email">
             <div class="d-flex mb-3" v-if="inputEmailHidden==false">
              <input
                class="form-control form-control-sm me-3"
                type="text"
                name="email"
                aria-label="Champs modification email"
                 v-model="userModified.email"
                 pattern="\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b"
                required/>
                 <!--Email modification button-->
               <button
                 @click="modifyEmail()"
                type="button"
                role="button"
                aria-label="Modifer email envoi"
                class="btn btn-outline-dark rounded-pill">
                  <font-awesome-icon class="fa-sm" icon="check" alt="Edit email" />
                </button>
              </div>
            </form>

           <!--Job position modification-->
            <div class="d-flex">
              <h3 class="h6 text-start mb-0 d-flex align-items-center">
                <strong> Poste occupé chez Groupomania: </strong>
              </h3>
              <!--Button for service modification input-->
               <button  
              v-if=" currentUser.id === localStorageUserId"
              class="btn rounded-pill p-0 ms-2"
              type="button"
              role="button"
              aria-label="Afficher modification poste"
              @click="inputServiceHidden=!inputServiceHidden">
                <font-awesome-icon class="fa-sm text-black-50" icon="edit" alt="Edit poste" />
               </button>
             </div>
              <!--User's service-->
             <p class="card-text text-start"> {{ currentUser.service }}</p>
               <!--Input for service modification-->
            <form 
            id="editPoste"
            aria-labelledby="Modification poste">
              <div class="d-flex mb-3" v-if="inputServiceHidden==false">
                <input
                class="form-control form-control-sm me-3"
                type="text"
                name="prenom"
                aria-label="Champs modification email"
                 v-model="userModified.service">
                 <!--Service modification button-->
               <button
                 @click="modifyService ()"
                type="button"
                role="button"
                aria-label="Modifer poste envoi"
                class="btn btn-outline-dark rounded-pill">
                  <font-awesome-icon class="fa-sm" icon="check" alt="Edit poste" />
                </button>
              </div>
            </form>

            <!-- Password modification -->
            <div class="d-flex mt-5 mb-3">
              <button class="btn btn-dark d-flex rounded-pill password"
              v-if=" currentUser.id === localStorageUserId"
              @click="passwordForm = !passwordForm"
              aria-label="Afficher modification mot de passe"
              data-bs-toggle="collapse"
              data-bs-target="#editidentifiant">
                Modifier votre mot de passe
              </button>
            </div>

            <!--PASSWORD FORM-->
              
          <div v-show="passwordForm" class="passwordForm jumbotron">
          <!--Current pasword input-->
            <form>
              <div class="form-group mb-0">
                <label for="oldPassword">Mot de passe actuel :</label>
               <input
               type="password"
               name="oldPassword"
               id="oldPassword"
               class="form-control"
               minlength="8"
               v-model="oldPassword"
               required/>
               <p id="passwordError"></p>
              </div>
              <div class="form-group mb-0">
          <!--New password input-->
              <label for="newPassword">Nouveau mot de passe :</label>
              <input
              type="password"
              name="newPassword"
              id="newPassword"
              class="form-control"
              minlength="8"
              v-model="newPassword"
              required
              v-on:input="checkDataPassword()"/>
              <p v-if="newPassword == oldPassword" class="errorMsg">
              Votre nouveau mot de passe ne peut pas être identique à l'ancien !
              </p>
              <p id="newPasswordError"></p>
              </div>
              <div class="form-group mb-0">
                <!--Input for new password confirmation-->
              <label for="newPasswordConfirm">
                Confirmer votre nouveau mot de passe :</label >
              <input
                type="password"
                name="newPasswordConfirm"
                id="newPasswordConfirm"
                class="form-control"
                minlength="8"
                v-model="newPasswordConfirm"
                required
                v-on:input="checkDataPassword()"/>
                 <p v-if="newPasswordConfirm != newPassword" class="errorMsg">
                   Merci d'entrer un mot de passe identique !
                 </p>
               </div>
                <!--Password modification button-->
               <button class="btn btn-dark d-flex rounded-pill" @click.prevent="changePassword()">
               Valider
              </button>
            </form>
           </div>
          </div>
        </section>
      </div>

    <button
      v-if="localStorageIsAdmin === true || currentUser.id === localStorageUserId"
      type="button"
      role="button"
      aria-label="Supprimer mon compte"
      class="btn btn-danger mt-5 w-50 m-auto rounded-pill"
      @click.prevent="deleteAccount()" >
        Supprimer compte
      </button>      
    </section>
  </main>
</template>

<script>
import axios from "axios";

const regexEmail = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;
const regexName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

export default {
    name: "MyProfile",
data() {
     
    return {
      userModified: {},

      currentUser:{},

      avatarModified: "",
      passwordForm: false,

      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",

      inputLastNameHidden:true,
      inputFirstNameHidden:true,
      inputEmailHidden:true,
      inputServiceHidden:true,
      
      localStorageIsAdmin:'',
        isAdmin: true,
        
      userData: {
        data: {
          avatar:""
        },
      },
      user: {
        userId: "",
      },
    };
  },

  mounted() {
    this.createUserData();
    console.log(this.userData);
  },
  created() {
    this.createUserData();
    const user = JSON.parse(localStorage.user)
    console.log(user)
    this.localStorageIsAdmin = user.data.isAdmin;
    this.localStorageUserId = user.data.userId;
    
    axios
      .get(`http://localhost:3000/api/auth/${this.$route.params.id}`, { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => { 
        this.currentUser = response.data;
      })
      .catch((error) => console.log('Erreur de la page, reconnectez-vous !'))
  },

  methods: {
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
    onFileSelected(event) {
      console.log(event);
      this.avatarModified = event.target.files[0] || event.dataTransfer.files;
      console.log(this.avatarModified);
    },
    modifyAvatar() {
      const fd = new FormData();
      fd.append("avatar", this.avatarModified);
      console.log("test", fd.get("avatar"));
      axios
        .put(
          "http://localhost:3000/api/auth/update/" + this.currentUser.id, fd,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          this.avatarModified = "";
          this.createUserData();
        })
        .catch((error) => console.log(error));
    },
    
    reload() {
        setTimeout("window.open(self.location, '_self');", 2000);
      },

    checkDataPassword() {
      const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/g;
      if (this.newPassword !== null && regexPassword.test(this.newPassword))
        return true;
      else {
        const errorMsg = document.getElementById("newPasswordError");
        errorMsg.textContent =
          "Le mot de passe ne doit pas contenir d'espace et doit avoir une longueur entre 8 et 20 caractères contenant au minimum 1 chiffre, 1 minuscule et 1 majuscule !";
      }
    },
    changePassword() {
      if (
        this.oldPassword != this.newPassword &&
        this.newPassword == this.newPasswordConfirm &&
        this.oldPassword != "" &&
        this.newPassword != "" &&
        this.newPasswordConfirm != ""
      ) {
        axios
          .put(
            "http://localhost:3000/api/auth/modifyPassword/" +
              this.userData.data.userId,
            { oldPassword: this.oldPassword, password: this.newPassword },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            console.log("password change", response);
            alert("Mot de passe modifié");
            this.oldPassword = "";
            this.newPassword = "";
            this.newPasswordConfirm = "";
            this.createUserData();
            this.$router.push("/")
          })
          .catch((err) => {
            console.log(err);
            const errorMsg = document.getElementById("passwordError");
            errorMsg.textContent = "Votre mot de passe est incorrect";
          });
      }
    },
    modifyLastName () {
      if (this.userModified.lastName !="" && regexName.test(this.userModified.lastName)) {
        const fd = new FormData();
        fd.append("lastName", this.userModified.lastName);
        axios
          .put(
          "http://localhost:3000/api/auth/update/" + this.currentUser.id, fd,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          this.currentUser.lastName=this.userModified.lastName;
          this.userModified.lastName = "";

          alert("Nom modifié !");
          this.inputLastNameHidden=true;
          this.createUserData();
          
        })
        .catch((error) => console.log(error));
       }
       else {
        alert ("Champ manquant ou erroné")
       }
    },
    modifyFirstName () {
       if (this.userModified.firstName !="" && regexName.test(this.userModified.firstName)) {
      const fd = new FormData();
      fd.append("firstName", this.userModified.firstName);
      axios
        .put(
          "http://localhost:3000/api/auth/update/" + this.currentUser.id, fd,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          this.currentUser.firstName=this.userModified.firstName;
          this.userModified.firstName = "";
          alert("Prénom modifié !");
          this.inputFirstNameHidden=true;
          this.createUserData();
        })
        .catch((error) => console.log(error));
       }
        else {
        alert ("Champ manquant ou erroné")
       }
    },
    modifyEmail () {
      if (this.userModified.email !="" && regexEmail.test(this.userModified.email)) {
      const fd = new FormData();
      fd.append("email", this.userModified.email);
      axios
        .put(
          "http://localhost:3000/api/auth/update/" + this.currentUser.id, fd,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
           this.currentUser.email=this.userModified.email;
          this.userModified.email = "";
          alert("Email modifié !");
          this.inputEmailHidden=true;
          this.createUserData();
        })
        .catch((error) => console.log(error));
       }
       else {
          alert ("Champ manquant ou erroné")
       }

    },
    modifyService () {
      if (this.userModified.service !="" && regexName.test(this.userModified.service)) {
     const fd = new FormData();
      fd.append("service", this.userModified.service);
      axios
        .put(
          "http://localhost:3000/api/auth/update/" + this.currentUser.id, fd,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
           this.currentUser.service=this.userModified.service;
          this.userModified.service = "";
          alert("Service modifié !");
          this.inputServiceHidden=true;
          this.createUserData();
        })
        .catch((error) => console.log(error));
       }
        else {
          alert ("Champ manquant ou erroné")
        }
    },
    deleteAccount() {
       console.log(this.localStorageIsAdmin)
      if (window.confirm("Etes-vous sûr de vouloir supprimer votre compte ?")) {
        axios
          .delete(
            "http://localhost:3000/api/auth/" + this.currentUser.id,
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then(() => {
    
            console.log(this.localStorageIsAdmin)
            if (this.localStorageIsAdmin === false) { 
            localStorage.removeItem("user");          
            this.$router.push("/signup")
          } else {       
            this.$router.push("/wall")
          }

          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style scoped>
.user-avatar {
  width:150px;
  height:150px;
  margin-bottom: 15px;
}
@media screen and (max-width: 768px) {
  .password {
    margin-left: 30px;
  }
}
</style>

            
            
              