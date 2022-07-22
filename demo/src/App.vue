<template>
  <div id="app">
    <div class="about">
      <img alt="Vue logo" src="@/assets/logo.png">
      <hello-world msg="Welcome to Your Vue.js App"></hello-world>
    </div>
    <div class="preview">
      <message-widget
        :sort-direction="'top'"
      ></message-widget>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MessageWidget from './components/MessageWidget.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    MessageWidget
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.about {
  width: 50%;
  padding: 100px 0;
  text-align: center;
  color: #2c3e50;
}
.preview {
  overflow: auto;
  position: fixed;
  top: 50%;
  left: 75%;
  width: 375px;
  height: 667px;
  background-color: #f5f5f5;
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>
