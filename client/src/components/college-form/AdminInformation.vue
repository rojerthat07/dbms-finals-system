<template>
  <keep-alive>
    <div class="form-container">
      <form class="college-form">
        <div id="admission-tab">
          <h1 class="form-section--heading">Admin Information</h1>

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
            <label class="college-form__input--label">Email: </label>
            <input
              type="text"
              v-model="information.email"
              placeholder="Email"
              class="college-form__input--input"
            />
          </p>
          <p class="two-column-college-form__input">
            <label class="college-form__input--label">Specialization: </label>
            <input
              type="text"
              v-model="information.specialization"
              placeholder="Specialization"
              class="college-form__input--input"
            />
            <label class="college-form__input--label">Department: </label>
            <input
              type="text"
              v-model="information.department"
              placeholder="Department"
              class="college-form__input--input"
            />
          </p>

          <h1 class="form-section--heading">Account Creation</h1>

          <p class="two-column-college-form__input">
            <label class="college-form__input--label">Username: </label>
            <input
              type="text"
              v-model="information.username"
              placeholder="Username"
              class="college-form__input--input"
            />
                <label class="college-form__input--label">Password: </label>
            <input
              type="password"
              v-model="information.password"
              placeholder="Password"
              class="college-form__input--input"
            />
          </p>

          <p class="two-column-college-form__input">
        
            <label class="college-form__input--label">Confirm Password: </label>
            <input
              type="password"
              name="confirm-password"
              v-model="confirmPassword"
              placeholder="Confirm Password"
              class="college-form__input--input"
            />
            <label class="college-form__input--label">Secret Code: </label>
            <input
              type="password"
              name="confirm-password"
              placeholder="Secret Code"
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
  name: "AdminInformation",
  data() {
    return {
      information: {
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        username: "",
        password: "",
        specialization: "",
        department: "",
      },
      confirmPassword: ""
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
        .post("/api/admins/insert-admin", this.information)
        .then((response) => {
          console.log(response);
          this.clearInformation();
          this.$router.push("success");
        })
        .catch((err) => {
          console.log("error");
          console.log(err.response);
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
