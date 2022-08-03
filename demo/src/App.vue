<template>
  <div id="app">
    <div class="about">
      <button type="button" @click="toggleSortDirection">
        방향 토글하기 인 ({{ sortDirection }})
      </button>
      <div>
        <p>userId toggle</p>
        <button class="toggle_user1" @click="toggleUserId">
          toggle {{ userId }}
        </button>
      </div>
      <div>
        <p>nickname toggle</p>
        <button class="toggle_user1" @click="toggleNickname1">
          toggle {{ nickname1 }}
        </button>
        <button class="toggle_user2" @click="toggleNickname2">
          toggle {{ nickname2 }}</button
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
      :nickname1="nickname1"
      :nickname2="nickname2"
      :channel="channel"
      :userId="userId"
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
      nickname1: "user1",
      nickname2: "user2",
      userId: "admin",

      //userId를 배열로 만들 수 있는 방법이 없을까?
      channel:
        "sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed",
    };
  },

  methods: {
    toggleSortDirection: function () {
      this.sortDirection = this.sortDirection === "top" ? "bottom" : "top";
    },
    toggleUserId() {
      this.userId = this.userId === "admin" ? "김인태" : "admin";
    },
    toggleNickname1() {
      this.nickname1 =
        this.nickname1 === "nickname1" ? "nickname2" : "nickname1";
    },
    toggleNickname2() {
      this.nickname2 =
        this.nickname2 === "nickname2" ? "nickname1" : "nickname2";
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
