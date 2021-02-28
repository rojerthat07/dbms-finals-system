<template>
  <div class="error">
    <div class="error__message">
      Authorization failed, You don't have Authorization to view this page
    </div>
    <router-link to="/" class="error__link">Go back to login page</router-link>
  </div>
</template>

<script>
export default { name: "TokenError" };
</script>

<style></style>
