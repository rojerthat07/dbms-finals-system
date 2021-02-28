<template>
  <div class="dhvsu__footer">
    <div class="footer__column1">
      <div class="footer__description">
        <a href="https://www.foi.gov.ph/"><img :src="foilogo" alt=""/></a>
        <a
          href="http://www.dhvsu.edu.ph/index.php/dhvsutransparency/72-dhvtsu-transparency-seal"
          ><img :src="transparencyLogo" alt=""
        /></a>

        <p>Villa de Bacolor, Pampanga, Philippines, 2001</p>
        <p>Telephone number: (777) 7777-7777.</p>
        <p>http://www.dhvsu.edu.ph</p>
        <p>
          © Don Honorio Ventura State University, 2014. All rights reserved.
        </p>
      </div>
    </div>
    <div class="footer__column2">
      <img :src="dhvsuLogo" alt="" />
    </div>

    <div class="footer__column3">
      <div class="footer__description">
        <div class="footer__icons">
          <i class="fab fa-github"></i>
          <i class="fab fa-facebook-f"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-youtube"></i>
          <i class="fab fa-instagram"></i>
        </div>

        <!-- <p class="footer__name">
          Developed by
          <span class="footer__name--name">
            Jer Carlo D. Catallo, 2020 <br /><i class="far fa-envelope"></i
            >jercarlocatallo@gmail.com</span
          >
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
import dhvsuLogo from "../assets/dhvsu-logo.png";
import foiLogo from "../assets/foilogo.png";
import transparencyLogo from "../assets/transparency seal.png";
export default {
  name: "Footer",
  data() {
    return {
      dhvsuLogo,
      foiLogo,
      transparencyLogo,
    };
  },
};
</script>

<style></style>
