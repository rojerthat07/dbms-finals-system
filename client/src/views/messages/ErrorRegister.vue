<template>
  <div class="error">
    <div class="error__message">
      <h3>There is a problem in registration</h3>
      It's either your username is already taken or your fields is blank
    </div>
    <button @click="onBackClick" class="error__link">
      Go back to registration page
    </button>
  </div>
</template>

<script>
export default {
  name: "ErrorRegister",
  data() {
    return { prevRoute: "" };
  },
  computed() {},
  beforeRouteEnter(to, from, next) {
    //Get the previous route
    next((vm) => {
      vm.prevRoute = from.fullPath;
    });
  },
  methods: {
    onBackClick() {
      this.$router.push(this.prevRoute);
    },
  },
};
</script>

<style></style>
