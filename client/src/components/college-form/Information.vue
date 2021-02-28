<template>
  <keep-alive>
    <div class="form-container">
      <form class="college-form">
        <div id="admission-tab">
          <h1 class="form-section--heading">Student Information</h1>

          <p class="two-column-college-form__input">
            <label class="college-form__input--label">Firstname: </label>

            <input
              type="text"
              v-model="information.first_name"
              placeholder="Firstname"
              class="college-form__input--input"
            />
            <label class="college-form__input--label">Lastname: </label>
            <input
              type="text"
              v-model="information.last_name"
              placeholder="Lastname"
              class="college-form__input--input"
            />
          </p>
          <p class="two-column-college-form__input">
            <label class="college-form__input--label">Middle Name: </label>
            <input
              type="text"
              v-model="information.middle_name"
              placeholder="Middle Name"
              class="college-form__input--input"
            />
            <label class="college-form__input--label">School ID: </label>
            <input
              type="number"
              v-model="information.school_ID"
              placeholder="School ID"
              class="college-form__input--input"
            />
          </p>
          <p class="two-column-college-form__input">
            <label class="college-form__input--label">Gender: </label>
            <select
              class="college-form__input--select"
              v-model="information.gender"
            >
              <option value="Male" selected="selected">Male</option>
              <option value="Female">Female</option>
            </select>
            <label class="college-form__input--label">Date of Birth: </label>
            <input
              type="text"
              v-model="information.date_of_birth"
              placeholder="ex. July 7, 2000"
              class="college-form__input--input"
            />
          </p>
          <p class="two-column-college-form__input">
            <label class="college-form__input--label">Age: </label>

            <input
              type="number"
              v-model="information.age"
              placeholder="Age"
              class="college-form__input--input"
            />
            <label class="college-form__input--label">Year Level: </label>
            <input
              type="text"
              v-model="information.year_level"
              placeholder="Year Level"
              class="college-form__input--input"
            />
          </p>

          <h1 class="form-section--heading">Account Creation</h1>

          <p class="two-column-college-form__input">
            <label class="college-form__input--label">Email Address: </label>
            <input
              type="text"
              v-model="information.email"
              placeholder="Email Address"
              class="college-form__input--input"
            />
            <label class="college-form__input--label">Username: </label>
            <input
              type="text"
              v-model="information.username"
              placeholder="Username"
              class="college-form__input--input"
            />
          </p>

          <p class="two-column-college-form__input">
            <label class="college-form__input--label">Password: </label>
            <input
              type="password"
              v-model="information.password"
              placeholder="Password"
              class="college-form__input--input"
            />
            <label class="college-form__input--label">Confirm Password: </label>
            <input
              type="password"
              name="confirm-password"
              v-model="confirmPassword"
              placeholder="Confirm Password"
              class="college-form__input--input"
            />
          </p>

          <p class="form-section--description">
            *This is only for preferences, within 6 months of inactivity your
            account will automatically removed and your information about the
            admission and will also be dismissed from the database and your
            admission will be cancelled *if you are not taken the exam in the
            said date*.
          </p>

          <div class="college-form__button">
            <router-link to="/agreement-college">
              <span class="college-form__button--button">BACK</span>
            </router-link>
            <router-link to="/admission">
              <span
                class="college-form__button--button"
                :style="[
                  checkProperties(information, account)
                    ? { display: 'none' }
                    : { display: 'inline-block' },
                ]"
                @click="handleSubmit"
                >SUBMIT</span
              >
            </router-link>
          </div>
        </div>
      </form>
    </div></keep-alive
  >
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "CollegeInformation",
  data() {
    return {
      information: {
        gender: "",
        date_of_birth: "",
        school_ID: null,
        first_name: "",
        last_name: "",
        middle_name: "",
        year_level: "",
        age: null,
        email: "",
        username: "",
        password: "",
      },
      confirmPassword: "",
    };
  },
  watch: {
    information: {
      handler() {},
      deep: true,
    },
  },
  methods: {
    ...mapActions(["updateInformation", "clearInformation"]),
    checkProperties(obj = null, obj2 = null) {
      const objToCheck = { ...obj, ...obj2 };
      for (let key in objToCheck) {
        //Check if the field is empty
        if (objToCheck[key] === "" || objToCheck[key] === null) {
          return true;
        }
      }
      //If field is not empty return false
      return false;
    },
    handleSubmit: function(event) {
      event.preventDefault();
      console.log(this.information);
      axios
        .post("/api/student/insert-student", this.information)
        .then((response) => {
          this.clearInformation();
          console.log(response);
          this.$router.push("success");
        })
        .catch(() => {
          console.log("error");
          this.$router.push("error-register");
        });
    },
  },

  computed: { ...mapGetters(["allApplicant"]) },
  mounted() {
    this.information = this.allApplicant.information;
  },
};
</script>

<style></style>
