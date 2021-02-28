<template>
  <!--Main Content-->
  <div class="main__introduction--container">
    <h1 class="main__introduction--heading">
      Don Honorio Ventura State University
    </h1>
    <img :src="dhvsuLogo" alt="dhvsu-logo" class="main__introduction--image" />
    <div class="main__introduction--description">
      <h1 class="description__heading">DHVSU ONLINE ACCOUNT</h1>
      <p class="main__introduction--information"></p>
    </div>
    <router-link to="/admission">
      <button class="main__introduction--button">
        Login/ Create account
      </button></router-link
    >
  </div>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import dhvsuLogo from "../assets/dhvsu-logo.png";
import foiLogo from "../assets/foilogo.png";
import transparencyLogo from "../assets/transparency seal.png";

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      dhvsuLogo: dhvsuLogo,
      foiLogo,
      transparencyLogo,
    };
  },
};
</script>
