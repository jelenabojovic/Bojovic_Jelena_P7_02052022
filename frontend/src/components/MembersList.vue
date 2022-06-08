<template>
<main class="container px-4">
<!-- Members list -->
    <section
    v-for="user in users"
    :key="user.id"
    class="row my-5">
      <!-- User's photo-->
      <article class='card col col-lg-5 pt-3 m-auto'>
        <img
        v-if="user.avatar != null"
        class="user-avatar rounded-circle mr-2 "
        :src ="`http://localhost:3000/images/users/${user.avatar}`"
        alt="Photo de l'utilisateur" />

        <div v-else>
            <img class="user-avatar rounded-circle mr-2" src="../assets/icon.png"  />
        </div>
        <!-- Informations -->
        <aside class="card-body">
          <h5 class="card-title">{{  user.lastName }}  {{ user.firstName }}</h5>
          <p> {{ user.service }}</p>
          <router-link class="btn btn-dark rounded-pill" :to="`/${user.id}`">Voir le profil</router-link>
        </aside>
      </article>
    </section>
  </main>
</template>

<script>
  import axios from "axios";

  export default {
    name: "MembersList",
    data() {
      return {  
        users:[],
        user: {
          userId:"",
          lastName:"",
          firstname:"",
          service:"",
          avatar:"",
        }
      };
    },
    
    created() {
    axios
      .get('http://localhost:3000/api/auth/', { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => { 
        this.users = response.data;
      })
       .catch((error) => console.log('Erreur de la page, reconnectez-vous !'))
    }
  }
</script>
<style scoped>
.user-avatar {
  width:150px;
  height:150px;
  margin-bottom: 15px;

}
</style>