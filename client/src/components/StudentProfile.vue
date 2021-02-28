<template>
  <div class="student-profile">
    <div class="student-profile__section">
      <ul class="student-profile__list">
        <h1>Student profile</h1>

        <li class="student-profile__item">
          <div class="student-profile__key">Student ID: &nbsp;</div>
          <div class="student-profile__value">{{ profile.student_ID }}</div>
        </li>
        <li class="student-profile__item">
          <div class="student-profile__key">Occupation:&nbsp;</div>
          <div class="student-profile__value">
            {{ profile.occupation_title }}
          </div>
        </li>
        <li class="student-profile__item">
          <div class="student-profile__key">First Name:&nbsp;</div>
          <div class="student-profile__value">{{ profile.first_name }}</div>
        </li>
        <li class="student-profile__item">
          <div class="student-profile__key">Last Name:&nbsp;</div>
          <div class="student-profile__value">{{ profile.last_name }}</div>
        </li>
        <li class="student-profile__item">
          <div class="student-profile__key">Middle Name:&nbsp;</div>
          <div class="student-profile__value">{{ profile.middle_name }}</div>
        </li>
        <li class="student-profile__item">
          <div class="student-profile__key">Birthdate:&nbsp;</div>
          <div class="student-profile__value">{{ profile.date_of_birth }}</div>
        </li>
        <li class="student-profile__item">
          <div class="student-profile__key">Age:&nbsp;</div>
          <div class="student-profile__value">{{ profile.age }}</div>
        </li>
        <li class="student-profile__item">
          <div class="student-profile__key">Gender:&nbsp;</div>
          <div class="student-profile__value">{{ profile.gender }}</div>
        </li>
        <li class="student-profile__item">
          <div class="student-profile__key">Year Level:&nbsp;</div>
          <div class="student-profile__value">{{ profile.year_level }}</div>
        </li>
        <li class="student-profile__item">
          <div class="student-profile__key">Status:&nbsp;</div>
          <div class="student-profile__value student-profile__value--status">
            &#9679;Online
          </div>
        </li>
      </ul>


    </div>
    <div class="college-form__button">
      <router-link to="/admission">
        <span class="college-form__button--button" @click="onLogout"
          >Logout</span
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

//When closing the tab when not logouted
window.onbeforeunload = async function(){
    await axios
        .post("/api/student/logout")
        .then(() => {
          this.$router.push("admission");
        })
        .catch(() => {
            this.$router.push("admission");
          });
}
export default {
  name: "StudentProfile",
  data() {
    return {
      profile: {},
      time: new Date(),
    };
  },
  methods: {
    onLogout() {
      axios
        .post("/api/student/logout")
        .then(() => {
          this.$router.push("admission");
        })
        .catch(() => {
            this.$router.push("admission");
          });
    },
  },
  created() {
    axios
      .get("/api/student/get-profile")
      .then((response) => {
        this.profile = response.data.result[0];
        console.log(this.profile);
      })
      .catch(() => this.$router.push("token-error"));
  },
  mounted() {
    console.log(this.profile);
  }
};
</script>

<style></style>
