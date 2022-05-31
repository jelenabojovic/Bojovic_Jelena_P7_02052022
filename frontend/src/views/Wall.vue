<template>
 <div class="container"> 
   <WallHeader/>
   <CreatePost @postCreated="test"/>
   <Posts ref="monWall"/>


   </div>
</template>

<script>
import WallHeader from '../components/WallHeader.vue';
import CreatePost from '../components/CreatePost.vue';
import Posts from '../components/Posts.vue';

export default {
  name: "Wall",
  components: {
    WallHeader,
    CreatePost,
    Posts
},
  data() {
    return {};
  },

  methods: {
    test () {
      alert ("ok")
      const Wall =this.$refs.monWall
      Wall.getAllPosts ();

    }
  },
};
</script>

<style>
</style>

