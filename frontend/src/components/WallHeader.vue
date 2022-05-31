<template>
  <header>
   <nav class="navbar navbar-light ">
  <router-link to = "/" class="text-decoration-none  text-dark"> 
    <img class ="navbar-brand " src="../assets/icon.svg" width="50" height="50"  alt="logo Groupomania"/>
    Groupomania
  </router-link>
    
    <ul class="nav">
      <li class="nav-item mt-3 px-4 ">
    <router-link to ="/profile" >
    <font-awesome-icon icon="user" aria-label="Mon profil" title="Mon profil"/>
    </router-link>
      </li>

      <li class="nav-item  mt-3 px-4 ">
        <router-link to ="/wall">
          <font-awesome-icon icon="house" aria-label="Fil d'actualité" title="Fil d'actualité"/>
    </router-link>
    </li>

     <li class="nav-item  mt-3 px-4">
       <router-link to ="/" @click="logout">
       <font-awesome-icon icon="right-from-bracket" aria-label="Me déconnecter" title="Me deconnecter"/>
    </router-link>
     </li>
    </ul>
    </nav>
  </header>
</template>

<script>
 export default {
    name: "WallHeader",
    data() {
     },
     mounted() {
    },
     methods: {
      logout() {
        localStorage.clear()
        this.$router.push("/");
      }
    }
  }
</script>

<style scoped>
a {
  color: black;
}
</style>