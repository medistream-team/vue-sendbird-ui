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
        <button class="toggle_user1" @click="toggleNickname">
          toggle {{ nickname }}
        </button>
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
      <div v-for="(item, $index) in list" :key="$index">
        {{ item.created_at }}
        <!-- Hacker News item loop -->
      </div>
      <infinite-loading
        :force-use-infinite-wrapper="true"
        direction="top"
        @infinite="infiniteHandler"
      >
      </infinite-loading>
    </div>

    <message-widget
      class="preview"
      :nickname="nickname"
      :channel="channel"
      :userId="userId"
      :sort-direction="sortDirection"
    ></message-widget>
  </div>
</template>

<script>
import MessageWidget from "./components/MessageWidget.vue";
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";

export default {
  name: "App",
  components: {
    InfiniteLoading,
    MessageWidget,
  },

  data() {
    return {
      page: 1,
      list: [],
      sortDirection: "top",
      nickname: "user1",
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
    toggleNickname() {
      this.nickname =
        this.nickname === "nickname" ? "another_nickname" : "nickname";
    },

    toggleChannel() {
      this.channel =
        this.channel ===
        "sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed"
          ? "sendbird_group_channel_79129877_dd9423fd98ccc7580dd06677341d4dff6c70862c"
          : "sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed";
    },
    infiniteHandler($state) {
      axios
        .get("//hn.algolia.com/api/v1/search_by_date?tags=story", {
          params: {
            page: this.page,
          },
        })
        .then(({ data }) => {
          if (data.hits.length) {
            this.page += 1;
            this.list.push(...data.hits);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
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
