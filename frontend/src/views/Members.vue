<template>
  <div class="Members">
    <WallHeader />
    <MembersList />
  </div>
</template>

<script>
  import WallHeader from "../components/WallHeader.vue";
  import MembersList from "../components/MembersList.vue";
  import router from '../router';

  export default {
    name: 'Members',
    components: {
      WallHeader, MembersList
    },
    
    mounted() {
      if (localStorage.token === undefined) {
        router.push({ path : '/'});
      }
    }
  }
</script>