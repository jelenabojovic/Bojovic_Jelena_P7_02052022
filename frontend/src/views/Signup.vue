<template>
  <div class="container">
    <Header />
    <main>
     <!-- REGISTRATION FORM -->
      <div class="row d-flex justify-content-center">
        <div class="connexion jumbotron">
          <form>
            <div class="form-group">
              <!-- Last name -->
              <label for="lastName">Nom</label>
              <input
                v-model="dataSignup.lastName"
                type="text"
                class="form-control"
                id="lastName"
                placeholder=""
                aria-describedby="lastName"
                required
                minlength="2"
              />
            </div>
            <!-- First name -->
            <div class="form-group">
              <label for="firstName">Prénom</label>
              <input
                v-model="dataSignup.firstName"
                type="text"
                class="form-control"
                id="firstName"
                placeholder=""
                required
                aria-describedby="firstName"
                minlength="2"
              />
            </div>
              <!-- Email -->
            <div class="form-group">
              <label for="email">Adresse mail</label>
              <input
                v-model="dataSignup.email"
                type="email"
                class="form-control"
                id="email"
                placeholder=""
                aria-describedby="email"
                required
              />
            </div>
            
          <!-- Job position -->
            <div class="form-group">
              <label for="service">Poste occupé</label>
              <input
                v-model="dataSignup.service"
                type="text"
                class="form-control"
                id="service"
                aria-describedby="service"
                placeholder=""
                required
              />
            </div>
            
          <!-- Password -->
            <div class="form-group">
              <label for="password">Mot de passe</label>
              <p class="help">(entre 8 et 20 caractères, sans espace et au minimum 1 chiffre, 1 minuscule et 1 majuscule)</p>
              <input
                v-model="dataSignup.password"
                type="password"
                class="form-control"
                id="password"
                required
                minlength="8"
                placeholder="********"
              />
            </div>
            <div class="form-group">
              <label for="passwordConfirmation"
                >Confirmer votre mot de passe</label
              >
              <input
                v-model="dataSignup.passwordConfirmation"
                type="password"
                class="form-control"
                id="passwordConfirmation"
                required
                minlength="8"
                placeholder="********"
              />
              <p
                v-if="dataSignup.password !== dataSignup.passwordConfirmation"
                class="errorMsg"
              >
                Veuillez confirmer votre mot de passe
              </p>
            </div>
            <p id="signupError"></p>

            <!-- Form sending -->
           <button
              @click="signup()"
              :disabled="checkDataSignup()"
              type="button"
              class="col btn btn-secondary mt-5"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";

export default {
  name: "Signup",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      dataSignup: {
        lastName: "",
        firstName: "",
        email: "",
        service: "",
        password: "",
      },
    };
  },
  methods: {
    checkDataSignup() {
      const regexEmail = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;
      const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/g;
      const regexAlpha =
        /^[a-zA-Zçñàéèêëïîôüù][a-zA-Zçñàéèêëïîôüù\- '\\.]{1,25}$/g;
      if (
        this.dataSignup.email !== null &&
          this.dataSignup.lastName !== null &&
          this.dataSignup.firstName !== null &&
          this.dataSignup.service !== null &&
          this.dataSignup.password !== null &&
        regexPassword.test(this.dataSignup.password) &&
        regexEmail.test(this.dataSignup.email) &&
        regexAlpha.test(this.dataSignup.lastName) &&
        regexAlpha.test(this.dataSignup.firstName)
      )
        return true;

    },

    signup() {
      axios
        .post("http://localhost:3000/api/auth/signup", this.dataSignup)
        .then((response) => {
          console.log(response);
          alert("Inscription validée, connectez vous !")
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error)
                    const errorMsg = document.getElementById("signupError");
          errorMsg.textContent =
            "Champ(s) manquants ou erronés";
          });
    },
  },
};
</script>

<style scoped>
.connexion {
  width: 50%;
}
.errorMsg {
  color: red;
}
#signupError{
  color: red;
  text-align: center;
}
.help{
  font-size: 10px;
  margin: 0px;
}

@media screen and (max-width: 768px) {
  .container {
    margin-left: 0px;
  }

}
</style>
