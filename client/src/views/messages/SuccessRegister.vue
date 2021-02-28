<template>
  <div class="success">
    <div class="success__message">
      You have been Successfully Registered, You can log in now
    </div>
    <button @click="onBackClick" class="error__link">
      Go back to registration page
    </button>
  </div>
</template>

<script>
export default {
  name: "SuccessRegister",
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
      this.$router.push("admission");
    },
  },
};
</script>

<style></style>
