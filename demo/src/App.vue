<template>
  <div id="app">
    <div class="preview">
      <message-widget :sort-direction="'top'"></message-widget>
    </div>
  </div>
</template>

<script>
import MessageWidget from "./components/MessageWidget.vue";

export default {
  name: "App",
  components: {
    MessageWidget,
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
