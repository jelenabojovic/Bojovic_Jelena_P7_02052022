<template>
 <div class="container"> 
   <WallHeader/>
    <div class="company-info">
      <h1> Groupomania</h1>
       <!-- Small text about company  -->
      <p class="about-company">
   Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion.<br> Nous avons actuellement
   plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. <br> Nous étions uniquement
   300 il y a 3 ans.
     </p>
     <p class="contact">
       <strong>Contact :</strong> <a href="mailto:info@groupomania.fr"> info@groupomania.fr </a>
      </p>
    </div>
   
   <Footer/>

  </div>
</template>

<script>
import WallHeader from '../components/WallHeader.vue';
import Footer from '../components/Footer.vue';

export default {
  name: "About",
  components: {
    WallHeader,
    Footer
  }
}
</script>

<style scoped>
h1 {
    margin-top:15px;
}
.company-info {
    margin-left:15px;
    margin-bottom: 100px;
}
.about-company {
    font-style: italic;
    font-size: large;
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>