<template>
  <div class="error">
    <div class="error__message">
      You enter a invalid Account please try again
    </div>
    <button @click="onBackClick" class="error__link">
      Go back to login page
    </button>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
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
