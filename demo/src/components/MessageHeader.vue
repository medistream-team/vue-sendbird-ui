<template>
  <div class="header-container">
    <p>🕳user</p>
    <div class="glass-container">
      <i class="ii ii-search" @click="modalClick"></i>
      <input
        class="search"
        type="text"
        v-model="filteringText"
        v-bind:class="search"
      />
    </div>

    <p>{{ filteringText }}</p>

    <!-- {{ filteringText | messageFilter }}-->

    <div></div>
  </div>
</template>

<script>
import "inticons/fonts/inticons.bundle.min.css";

export default {
  components: {},
  data() {
    return {
      filteringText: "",
      test: "",
      search: "searchoff",
      modal: true,
    };
  },
  inject: ["msg"],

  filters: {
    messageFilter() {
      return this.msg.itemList
        .map((message) => message.message)
        .filter((num) => {
          return num.toLowerCase().includes(this.filteringText.toLowerCase());
        });
    },
  },

  methods: {
    modalClick() {
      if (this.modal) {
        this.search = "searchon";
        this.modal = !this.modal;
      } else {
        this.search = "searchoff";
        this.modal = !this.modal;
      }
    },
  },
  computed: {},
};
</script>

<style scope>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: coral;
}
.header-container p {
  margin-left: 20px;
}
.glass-container {
  position: relative;
  display: flex;
  min-width: 200px;
}
.glass-container input {
  position: relative;
  transition: all 0.3s ease-in-out;
  z-index: 1;
}
.glass-container i {
  position: absolute;
  left: 10px;
  top: 50%;
  margin-top: -8px;
  cursor: pointer;
  z-index: 2;
}
.searchoff {
  width: 0;
  opacity: 0;
}
.searchon {
  width: 100%;
  opacity: 1;
}
</style>
