<template>
  <div class="twocolumn__container">
    <div class="select__section--container">
      <h1 class="section--heading">DHVSU Admission</h1>
      <div class="section__description--container">
        <p class="section--information">
          We convey to you our deepest appreciation for your interest in
          becoming a "Honorian". Be sure to remember your username, password,
          and reference number when you submit your online application.
        </p>
      </div>
      <div class="section__options--container">
        <router-link to="/agreement-college">
          <button class="section--option o1">
            Student Registration
          </button></router-link
        >
        <router-link to="/agreement-admin">
          <button class="section--option o2">
            Admin Registration
          </button></router-link
        >
      </div>
    </div>

    <div v-if="isAdmin" class="login__form--container">
      <div class="login__form--description">
        <h1 class="form--heading">DHVSU Administrator</h1>
        <p class="form--information">
          This section is only for admin of DHVSU
        </p>

        <p class="form--information notes">*Please secure your Account*</p>
      </div>
      <h1 class="login__form--heading">Login</h1>
      <form class="login-form">
        <p class="login-form__input">
          <label class="login-form__input--label">Username</label>
          <input
            type="text"
            class="login-form__input--input"
            v-model="username"
          />
        </p>
        <p class="login-form__input">
          <label class="login-form__input--label">Password</label>
          <input
            type="password"
            class="login-form__input--input"
            v-model="password"
          />
        </p>
        <button class="login-form__button" @click="handleSubmitAdmin">
          Login
        </button>
        <button class="login-form__button" @click="changeForm">
          Student
        </button>
      </form>
    </div>
    <div v-else class="login__form--container">
      <div class="login__form--description">
        <h1 class="form--heading">DHVSU Student Account</h1>
        <p class="form--information">
          This section is only for STUDENTS
        </p>

        <p class="form--information notes">*Please secure your Account*</p>
      </div>
      <h1 class="login__form--heading">Login</h1>
      <form class="login-form">
        <p class="login-form__input">
          <label class="login-form__input--label">Username</label>
          <input
            type="text"
            class="login-form__input--input"
            v-model="username"
          />
        </p>
        <p class="login-form__input">
          <label class="login-form__input--label">Password</label>
          <input
            type="password"
            class="login-form__input--input"
            v-model="password"
          />
        </p>
        <button class="login-form__button" @click="handleSubmitStudent">
          Login
        </button>
        <button class="login-form__button" @click="changeForm">Admin</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Admission",
  data() {
    return {
      isAdmin: false,
      username: "",
      password: "",
    };
  },
  methods: {
    handleSubmitStudent: function(event) {
      event.preventDefault();

      const username = this.username;
      const password = this.password;
      const created_at = new Date().toString();
      const updated_at = "Online"
      axios
        .post("/api/student/login", { username, password,created_at,updated_at })
        .then((response) => {
          console.log(response); // this.$router.push("error");
          this.$router.push("student-profile");
        })
        .catch(() => {
          this.$router.push("error");
        });
    },
    handleSubmitAdmin: function(event) {
      event.preventDefault();

      const username = this.username;
      const password = this.password;

      axios
        .post("/api/admins/login-admin", { username, password })
        .then((response) => {
          localStorage.setItem(
            "details",
            JSON.stringify(response.data.details[0])
          );
          // console.log(response.data.details[0], 1); // this.$router.push("error");
          this.$router.push("admin-page");
        })
        .catch((err) => {
          console.log(err.response);
          this.$router.push("error");
        });
    },
    changeForm: function() {
      this.isAdmin = !this.isAdmin;
    },
  }
};
</script>

<style></style>
