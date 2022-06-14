<template>
  <header>
   <nav class="navbar navbar-light ">
    <router-link to = "/about" class="text-decoration-none  text-dark"> 
       <img class ="navbar-brand " src="../assets/icon.svg" width="50" height="50"  alt="logo Groupomania"/>
        Groupomania
    </router-link>

    <ul class="nav">
      <!--My profile icon-->
      <li class="nav-item mt-3 px-4 ">
        <router-link v-if="userData.data" :to ="`/profile/${userData.data.userId}`" >
          <font-awesome-icon icon="user" aria-label="Mon profil" title="Mon profil"/>
        </router-link>
      </li>
      <!--Members list icon-->
      <li class="nav-item mt-3 px-4 ">
       <router-link to ="/members" >
         <font-awesome-icon icon="users" aria-label="Members list" title="Members"/>
       </router-link>
      </li>
     <!--Feed icon-->
      <li class="nav-item  mt-3 px-4 ">
        <router-link to ="/wall">
          <font-awesome-icon icon="house" aria-label="Fil d'actualité" title="Fil d'actualité"/>
        </router-link>
      </li>
      <!--Logout icon-->
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
      return{
        userData:{}
      }
     },
     mounted () {
       this.createUserData();
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