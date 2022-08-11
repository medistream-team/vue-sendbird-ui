<template>
  <div id="app">
    <div class="about">
      <h1>Vue Sendbird UI</h1>
      <br><br>
      <button type="button" @click="toggleSortDirection">
        방향 토글하기 인 ({{ sortDirection }})
      </button>
      <div>
        <p>userId toggle</p>
        <button class="toggle_user1" @click="toggleUser">
          toggle {{ userId }} {{nickname}}
        </button>
      </div>
      <div>
        <div>
          <p>channel toggle</p>
          <button class="toggle_channel" @click="toggleChannel">
            toggle {{ channel }}
          </button>
        </div>

        <p>
          {{ channel }}
        </p>
      </div>
    </div>

    <message-widget
      class="preview"
      theme-color="#1d77ff"
      :nickname="nickname"
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
      nickname: "user1",
      userId: "user1Id",
      channel:
        "sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed",
    };
  },

  methods: {
    toggleSortDirection: function () {
      this.sortDirection = this.sortDirection === "top" ? "bottom" : "top";
    },


    toggleUser() {
      this.nickname =
      this.nickname === "user1" ? "user2" : "user1";
      this.userId = this.userId === "user2Id" ? "user1Id" : "user2Id";
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
  position: fixed;
  top: 50%;
  left: 75%;
  width: 360px;
  height: 80%;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3), 0 10px 30px 0 rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
}
</style>
