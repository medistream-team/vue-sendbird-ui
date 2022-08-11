<template>
  <div id="app">
    <div class="about">
      <h1>Vue Sendbird UI</h1>
      <p>
        <a href="https://sendbird.com/">Sendbird</a> 기반 채팅 UI 컴포넌트 입니다.<br>
        Vue 2 버전에 최적화 되어있습니다.
      </p>
      <p>
        아래 버튼을 눌러 기능을 테스트 해보세요!
      </p>

      <hr>

      <h2>메시지 방향 정하기</h2>
      <div class="controls">
        <button
          type="button"
          :class="{active: sortDirection === 'top'}"
          @click="sortDirection = 'top'">
          <i class="ii ii-check"></i> 위로 정렬하기
        </button>
        <button
          type="button"
          :class="{active: sortDirection === 'bottom'}"
          @click="sortDirection = 'bottom'">
          <i class="ii ii-check"></i>
          아래로 정렬하기
        </button>
      </div>

      <h2>사용자 변경하기</h2>
      <div class="controls">
        <button
          type="button"
          :class="{active: userId === users[0].id}"
          @click="userId = users[0].id; nickname = users[0].nickname;">
          <i class="ii ii-check"></i>
          User 1
        </button>
        <button
          type="button"
          :class="{active: userId === users[1].id}"
          @click="userId = users[1].id; nickname = users[1].nickname;">
          <i class="ii ii-check"></i>
          User 2
        </button>
      </div>

      <h2>채팅방 옮기기</h2>
      <div class="controls">
        <button
          type="button"
          :class="{active: channel === sendbirdChannels[0]}"
          @click="channel = sendbirdChannels[0]">
          <i class="ii ii-check"></i>
          Channel 1
        </button>
        <button
          type="button"
          :class="{active: channel === sendbirdChannels[1]}"
          @click="channel = sendbirdChannels[1]">
          <i class="ii ii-check"></i>
          Channel 2
        </button>
      </div>

      <h2>색상 변경하기</h2>
      <div class="controls">
        <button
          type="button"
          :class="{active: themeColor === colorPalette[0]}"
          @click="themeColor = colorPalette[0]">
          <i class="ii ii-check"></i>
          노랑
        </button>
        <button
          type="button"
          :class="{active: themeColor === colorPalette[1]}"
          @click="themeColor = colorPalette[1]">
          <i class="ii ii-check"></i>
          파랑
        </button>
      </div>
    </div>

    <message-widget
      v-if="widgetStatus"
      class="preview"
      :userId="userId"
      :nickname="nickname"
      :channel="channel"
      :theme-color="themeColor"
      :sort-direction="sortDirection"
    ></message-widget>

  </div>
</template>

<script>
import MessageWidget from "./components/MessageWidget.vue";
//import { SendbirdAction } from "@/sendbird/SendbirdAction";


export default {
  name: "App",
  components: {
    MessageWidget ,
  },
  props: {
    users: {
      type: Array,
      default: () => {
        return [
          {
            id: 'user1Id',
            nickname: 'user1'
          },
          {
            id: 'user2Id',
            nickname: 'user2'
          }
        ]
      }
    },
    sendbirdChannels: {
      type: Array,
      default: () => {
        return [
          'sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed',
          'sendbird_group_channel_79129877_dd9423fd98ccc7580dd06677341d4dff6c70862c'
        ]
      }
    },
    colorPalette: {
      type: Array,
      default: () => {
        return [
          '#fef01b', // 노랑색
          '#1d77ff' // 파랑색
        ]
      }
    }
  },
  data() {
    return {
      userId: this.users[0].id,
      nickname: this.users[0].nickname,
      channel: this.sendbirdChannels[0],
      themeColor: this.colorPalette[0],
      sortDirection: 'top', // top, bottom
      widgetStatus: true
    };
  },
  watch: {
    userId(value) {
      this.widgetStatus = false
      setTimeout(() => {
        this.widgetStatus = true
      }, 1)
    },
    channel(value) {
      this.widgetStatus = false
      setTimeout(() => {
        this.widgetStatus = true
      }, 1)
    },
    sortDirection(value) {
      this.widgetStatus = false
      setTimeout(() => {
        this.widgetStatus = true
      }, 1)
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
  position: fixed;
  left: 50%;
  padding: 120px 0;
  line-height: 160%;
  color: #2c3e50;
}
.about hr {
  margin: 30px 0;
  border: none;
  border-bottom: 1px solid #eee;
}
.about h1 {
  margin-bottom: 30px;
}
.about h2 {
  margin: 30px 0 10px;
  font-size: 20px;
}
.about p {
  margin: 15px 0;
}
.about a {
  opacity: 0.8;
  color: #2c3e50;
}
.about .controls button {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background: none;
  color: #999;
  font-size: 15px;
  cursor: pointer;
}
.about .controls button i {
  color: #ccc;
  font-size: 20px;
}
.about .controls button.active {
  border-color: #aaa;
  color: #2c3e50;
}
.about .controls button.active i {
  color: #03c04a;
}
.about .controls button + button {
  margin-left: 10px;
}
.preview {
  position: fixed;
  top: 50%;
  right: 50%;
  width: 360px;
  height: 80%;
  margin-right: 100px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3), 0 10px 30px 0 rgba(0, 0, 0, 0.1);
  transform: translate(0, -50%);
}
</style>
