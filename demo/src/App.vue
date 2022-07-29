<template>
  <div id="app">
    <div class="about">

      <button type="button" @click="toggleSortDirection()">
        방향 토글하기 ({{ sortDirection }})
      </button>

      <img alt="Vue logo" src="@/assets/logo.png">
      

    </div>
    <div class="preview">
      <message-widget :sort-direction="sortDirection"></message-widget>
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
  data () {
    return {
      sortDirection: 'top'
    }
  },
  methods: {
    toggleSortDirection: function () {
      this.sortDirection = (this.sortDirection === 'top' ? 'bottom' : 'top');
    }
  }
};
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
