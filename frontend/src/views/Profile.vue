<template>
  <div class="profil">
    <WallHeader />
    <MyProfile />
  </div>
</template>

<script>
  import WallHeader from "../components/WallHeader.vue";
  import MyProfile from "../components/MyProfile.vue";

  export default {
    name: 'Profile',
    components: {
      WallHeader, MyProfile
    }
  }
</script>