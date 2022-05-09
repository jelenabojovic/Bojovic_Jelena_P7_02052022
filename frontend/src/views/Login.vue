<template>
  <div class="container">
    <Header />
    <main>

      <div class="row d-flex justify-content-center">
        <form class="connexion jumbotron">
          <div class="form-floating mt-3">
            <input 
            v-model="dataLogin.email"
            type="email" 
            class="form-control" 
            id="floatingInput" 
            aria-describedby="email" 
            placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
            </div>
  
          <div class="form-floating mt-3">
             <input
              v-model="dataLogin.password"
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password">
              <label for ="floatingPassword">Mot de passe </label>
          </div>

          <button
            @click="login()"
            type="button"
            class="col btn btn-secondary"
            :disable="checkDataLogin()"
          >
            Connexion
          </button>
          <p id="loginError" class="mt-2 text-danger text-center"></p>
          <div class="text-center mb-2"> Vous n'avez pas de compte ?
          <router-link class="col" to="/Signup"
            >S'inscrire
          </router-link>
          </div>
        </form>
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
  name: "Login",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      dataLogin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    checkDataLogin: function () {
      if (!this.dataLogin.email || !this.dataLogin.password) {
        return true;
      } else if (this.dataLogin.email && this.dataLogin.password) {
        return false;
      }
    },

    login: function () {
      axios
        .post("http://localhost:3000/api/auth/login", this.dataLogin)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response));
          console.log(response);
          this.$router.push("/Feed");
        })
        .catch((error) => {
          console.log(error);
          const errorMsg = document.getElementById("loginError");
          errorMsg.textContent =
            "Votre email ou votre mot de passe est incorrect";
        });
    },
  },
};
</script>
<style scoped>

.form-floating {
  margin-bottom: 10px;
}
main {
  margin-top: 50px;
}

form {
  margin-top: 15px;
}

.connexion {
  width: 50%;
}
.btn-secondary,
.btn-primary {
  display: block;
  margin: auto;
  width: 50%;
}

@media screen and (max-width: 768px) {
  .connexion {
    width: 100%;
  }
  .btn-secondary,
  .btn-primary {
    width: 100%;
  }
}
</style>
