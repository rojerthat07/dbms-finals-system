<template>
  <div class="header">
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/about">About</router-link> -->
    <router-link to="/"> <img v-bind:src="dhvsuLogo" alt=""/></router-link>
    <div>
      <h1>Don Honorio Ventura State University</h1>
      <p>Opening Minds, Progressing Technologies, Creating Brighter Futures</p>
      <h4>Escuela de Artes y Oficios</h4>
      <h6>Since 1861</h6>
    </div>
  </div>

  <!--Navigation-->
  <nav class="navbar navbar-expand-md navbar-dark">
    <button
      class="navbar-toggler"
      data-toggle="collapse"
      data-target="#collapsibleNavbar"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="#" class="nav-link">DHVSU</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">ADMISSION</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">ADMINISTRATION</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">ACADEMICS</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">LINKAGES</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">EXTENSION</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">SERVICES</a>
        </li>
      </ul>
    </div>
    <i class="fas fa-search nav-search"></i>
  </nav>
</template>

<script>
import dhvsuLogo from "../assets/dhvsu-logo.png";
import foiLogo from "../assets/foilogo.png";
import transparencyLogo from "../assets/transparency seal.png";

export default {
  name: "Header",
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
