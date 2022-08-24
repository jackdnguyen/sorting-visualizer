<template>
  <div id="app">
    <Navbar />
    <sortingVisualizer />
  </div>
</template>

<script>
import sortingVisualizer from "./components/sortingVisualizer.vue";
import Navbar from "./components/navBar.vue";
export default {
  name: "App",
  components: {
    sortingVisualizer,
    Navbar
  },
};
</script>

<style src="./style/App.css"></style>
