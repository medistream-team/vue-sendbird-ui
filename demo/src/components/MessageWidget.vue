<template>
  <div class="message-widget" :class="{
    'sort-top': sortDirection === 'top',
    'sort-bottom': sortDirection === 'bottom',
  }">

    <message-header :user-id="userId"></message-header>

    <message-input
      @addInputMessage="addInputMessage"
      @addInputFile="addInputFile">
    </message-input>

    <!-- TODO: channel Id가 없을 때 페이지를 만들어보자!-->

    <message-log
      v-model="messages"
      :nickname="nickname"
      :userId="userId"
      :classValue="classValue"
      :sort-direction="sortDirection"
    >
    </message-log>

  </div>
</template>

<script>
import MessageInput from "@/components/MessageInput";
import MessageLog from "@/components/MessageLog";
import MessageHeader from "./MessageHeader.vue";
import { SendbirdAction } from "@/sendbird/SendbirdAction";
import { SendBirdEvent } from "@/sendbird/SendbirdEvent";
import { computed } from "vue";

export default {
  name: "MessageWidget",
  components: {
    MessageInput,
    MessageLog,
    MessageHeader,
  },

  props: {
    themeColor: {
      type: String,
      default: '#1d77ff'
    },
    sortDirection: {
      type: String,
      default: "top",
    },
    userId: {
      type: String,
      default: "admin",
    },

    nickname: {
      type: String,
      default: "nickname",
    },

    channel: {
      type: String,
      default:
        "sendbird_group_channel_79129877_dd9423fd98ccc7580dd06677341d4dff6c70862c",
    },
  },

  data() {
    return {
      showInfiniteLoadingIndicator: false,
      scrollElement: document.querySelector(".chat-container"),
      classValue: true,
      channel1:
        "sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed",
      channel2:
        "sendbird_group_channel_79129877_dd9423fd98ccc7580dd06677341d4dff6c70862c",
      loadMessage: 20,

      messages: [],
    };
  },

  provide () {
      const config = {}
      Object.defineProperty(config, 'themeColor', {
          enumerable: true,
          get: () => this.themeColor,
      })
      Object.defineProperty(config, 'sortDirection', {
          enumerable: true,
          get: () => this.sortDirection,
      })
      return { config , msg: computed(() => {
        return this.messages;
      })}
  },


  //toggle button들 만들기
  watch: {
    sortDirection: {
      handler: function (value) {
        if (value !== "top") {
          this.msg.reverse();
        } else {
          this.msg.reverse();
        }
      },
    },
    nickname: {
      handler: function (value) {
        const sendbirdAction = SendbirdAction.getInstance();
        if (value !== "nickname") {
          sendbirdAction.init(this.userId, this.nickname, this.channel);
        } else {
          sendbirdAction.init(this.userId, this.nickname, this.channel);
        }
      },
    },

    channel: {
      handler: function () {
        const sendbirdAction = SendbirdAction.getInstance();

        if (this.channel !== this.channel) {
          sendbirdAction.init(this.userId, this.nickname, this.channel);
          sendbirdAction.getMessageList(this.loadMessage);
        } else {
          sendbirdAction.init(this.userId, this.nickname, this.channel);
          sendbirdAction.getMessageList(this.loadMessage);
        }
      },
    },
  },
  methods: {
    addInputMessage: function (message) {
      this.messages = [message].concat(this.messages);
      console.log(this.messages);
    },

    addInputFile: function (file) {
      console.log("hi", file.url);
      this.messages = [file].concat(this.messages);
    },
  },
  async created() {
    const sendbirdAction = SendbirdAction.getInstance();
    const error = await sendbirdAction.init(
      "김인태",
      "김인태",
      "sendbird_group_channel_79129877_dd9423fd98ccc7580dd06677341d4dff6c70862c"
    );

    if (!error) {
      sendbirdAction.getMessageList(this.loadMessage).then((response) => {
        this.messages = response;
        if (this.messages.length > 0) {
          this.showInfiniteLoadingIndicator = true;
        }
      });

      const channelEvent = new SendBirdEvent();

      channelEvent.onMessageReceived((message) => {
        this.messages = [message].concat(this.messages);
      });

      channelEvent.onMessageReceived((file) => {
        this.messages = [file].concat(this.messages);
      });
    }
  },
};
</script>

<style scoped>
.message-widget {
  position: relative;
  min-width: 320px;
  min-height: 480px;
  background-color: rgba(150, 150, 150, 0.1);
}
.message-header {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 50px;
}
.message-input {
  position: absolute;
  right: 0;
  left: 0;
  height: 50px;
}
.sort-top .message-input {
  top: 50px;
  bottom: auto;
}
.sort-bottom .message-input {
  top: auto;
  bottom: 0;
}
.message-log {
  overflow: auto;
  position: absolute;
  right: 0;
  left: 0;
}
.sort-top .message-log {
  top: 100px;
  bottom: 0;
}
.sort-bottom .message-log {
  top: 50px;
  bottom: 50px;
}
</style>
