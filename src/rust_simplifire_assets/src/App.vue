<template>
  <div id="app">
    <div>{{ greeting || 'Loading message from Internet Computer...' }}</div>
  </div>
</template>

<script>
import { rust_simplifire } from "../../declarations/rust_simplifire";
export default {
  name: "App",
  data: () => {
    return {
      greeting: ''
    };
  },
  created() {
    rust_simplifire.greet(window.prompt("Enter your name:")).then(greeting => {
      this.greeting = greeting
    });
  }
}
</script>

<style scoped>

</style>