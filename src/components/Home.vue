<template>
  <v-content>
    <v-layout justify-right align-center>
      <h1>Home</h1>
    </v-layout>
    {{msg}}
  </v-content>
</template>

<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        msg: "Welcome to Your Vue.js App"
      };
    }
  };

</script>

<style scoped>


</style>
