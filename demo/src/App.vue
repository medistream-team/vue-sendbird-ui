<template>
  <div id="app">
    <div class="about">
      <button type="button" @click="toggleSortDirection">
        방향 토글하기 인 ({{ sortDirection }})
      </button>
      <div>
        <button class="toggle_user1" @click="toggleUser1">
          toggle {{ userId1 }}
        </button>
        <button class="toggle_user2" @click="toggleUser2">
          toggle {{ userId2 }}</button
        ><button class="toggle_channel" @click="toggleChannel">
          toggle channel
        </button>

        <p>
          {{ channel }}
        </p>
      </div>
    </div>

    <message-widget
      class="preview"
      :userId1="userId1"
      :userId2="userId2"
      :channel="channel"
      :sort-direction="sortDirection"
    ></message-widget>
  </div>
</template>

<script>
import MessageWidget from "./components/MessageWidget.vue";

export default {
  name: "App",
  components: {
    MessageWidget,
  },

  data() {
    return {
      sortDirection: "top",
      userId1: "user1",
      userId2: "user2",
      //userId를 배열로 만들 수 있는 방법이 없을까?
      channel:
        "sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed",
    };
  },

  methods: {
    toggleSortDirection: function () {
      this.sortDirection = this.sortDirection === "top" ? "bottom" : "top";
    },
    toggleUser1() {
      this.userId1 = this.userId1 === "user1" ? "김인태" : "user1";
    },
    toggleUser2() {
      this.userId2 = this.userId2 === "user2" ? "김인태" : "user2";
    },
    toggleChannel() {
      this.channel =
        this.channel ===
        "sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed"
          ? "sendbird_group_channel_79129877_dd9423fd98ccc7580dd06677341d4dff6c70862c"
          : "sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed";
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 10000px;
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
  width: 600px;
  height: 800px;
  background-color: #f5f5f5;
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>
