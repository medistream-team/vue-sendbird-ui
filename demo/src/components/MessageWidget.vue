<template>
  <div class="chat-container" @scroll="handleScroll">
    <!-- <header-bar></header-bar> -->
    <button @click="convert"></button>
    <message-header></message-header>

    <!--file-import @fileSelect="addInputFile"></file-import> -->
    <message-input
      v-if="sortDirection === 'top'"
      @addInputMessage="addInputMessage"
      @addInputFile="addInputFile"
    >
      <!-- channel Id가 없을 때 페이지를 만들어보자!-->
    </message-input>
    <message-log
      v-model="messages"
      :userId="userId"
      :classValue="classValue"
      :sort-direction="sortDirection"
    ></message-log>
    <message-input
      v-if="sortDirection === 'bottom'"
      @addInputMessage="addInputMessage"
      @addInputFile="addInputFile"
    ></message-input>
  </div>
</template>

<script>
//import FileImport from "@/components/FileImport";
import MessageInput from "@/components/MessageInput";
import MessageLog from "@/components/MessageLog";
import MessageHeader from "./MessageHeader.vue";
import { computed } from "vue";
import { SendbirdAction } from "@/sendbird/SendbirdAction";
import { SendBirdEvent } from "@/sendbird/SendbirdEvent";

export default {
  name: "MessageWidget",
  components: {
    //FileImport,
    MessageInput,
    MessageLog,
    MessageHeader,
  },
  props: {
    sortDirection: {
      type: String,
      default: "top",
    },
    userId: {
      type: String,
      default: "admin",
    },

    nickname1: {
      type: String,
      default: "user1",
    },
    nickname2: {
      type: String,
      default: "user2",
    },
    channel: {
      type: String,
      default:
        "sendbird_group_channel_79129877_dd9423fd98ccc7580dd06677341d4dff6c70862c",
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  provide() {
    return {
      msg: computed(() => {
        return this.messages; // 콜백 함수 형태로 return
      }),
    };
  },

  data() {
    return {
      messages: {
        hasMoreMessage: false,
        itemList: [],
      },
      classValue: true,
      channel1:
        "sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed",
      channel2:
        "sendbird_group_channel_79129877_dd9423fd98ccc7580dd06677341d4dff6c70862c",
      loadMessage: 15,
      page: 1,
    };
  },

  //toggle button들 만들기
  watch: {
    sortDirection: {
      immediate: true,
      handler: function (value) {
        if (value !== "top") {
          this.messages.itemList.reverse();
        } else {
          this.messages.itemList.reverse();
        }
      },
    },
    nickname1: {
      handler: function (value) {
        const sendbirdAction = SendbirdAction.getInstance();
        if (value !== "user1") {
          sendbirdAction.init(this.userId, this.nickname1, this.channel);
        } else {
          sendbirdAction.init(this.userId, this.nickname1, this.channel);
        }
      },
    },
    nickname2: {
      handler: function (value) {
        const sendbirdAction = SendbirdAction.getInstance();
        if (value !== "user2") {
          sendbirdAction.init(this.userId, this.nickname2, this.channel);
        } else {
          sendbirdAction.init(this.userId, this.nickname2, this.channel);
        }
      },
    },
    channel: {
      handler: function () {
        const sendbirdAction = SendbirdAction.getInstance();

        if (this.channel !== this.channel) {
          sendbirdAction.init(this.userId1, this.channel1);
          sendbirdAction.getMessageList(this.loadMessage);
        } else {
          sendbirdAction.init(this.userId, this.channel2);
          sendbirdAction.getMessageList(this.loadMessage);
        }
      },
    },
  },
  methods: {
    convert() {},
    addInputMessage: function (message) {
      this.messages.itemList = [message].concat(this.messages.itemList);
    },

    addInputFile: function (file) {
      console.log("hi", file.url);
      this.messages.itemList = [file].concat(this.messages.itemList);
    },
    handleScroll() {
      //메시지 리스트를 불러오는 메소드?
      const chat = document.querySelector(".chat-container");
      let scrollHeight = chat.scrollHeight;
      let scrollTop = chat.scrollTop;
      const sendbirdAction = SendbirdAction.getInstance();
      console.log("scrollHeight  ::", scrollHeight);
      console.log("scrollTop  ::", scrollTop);
      if (scrollTop + 800 === scrollHeight) {
        console.log("d");
        this.loadMessage += 15;
        sendbirdAction.getMessageList(this.loadMessage);
        const channelEvent = new SendBirdEvent();
        channelEvent.onMessageReceived((message) => {
          this.messages.itemList = [message].concat(this.messages.itemList);
        });
      }
    },
  },
  //
  computed: {
    //sendbirdAction.getMessageList(this.loadMessage)
    //const sendbirdAction = SendbirdAction.getInstance();
  },
  async created() {
    const sendbirdAction = SendbirdAction.getInstance();
    const error = await sendbirdAction.init(
      "김인태",
      this.nickname1,
      this.channel
    );
    // this.msg,,,,,

    if (!error) {
      sendbirdAction
        .getMessageList(this.loadMessage)

        .then((response) => (this.messages = response));

      const channelEvent = new SendBirdEvent();

      channelEvent.onMessageReceived((message) => {
        this.messages.itemList = [message].concat(this.messages.itemList);
      });

      channelEvent.onMessageReceived((file) => {
        this.messages.itemList = [file].concat(this.messages.itemList);
      });
    }
  },
};
</script>

<style scoped></style>
