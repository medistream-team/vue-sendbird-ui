<template>
  <div class="chat-container" @scroll="handleScroll">
    <!-- <header-bar></header-bar> -->

    <div>{{ userId1 }}</div>
    <div>{{ channel }}</div>
    <button @click="clickcc">{{ loadMessage }}</button>
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
    userId1: {
      type: String,
      default: "user1",
    },
    userId2: {
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
      userId: "김인태",

      channel1:
        "sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed",
      channel2:
        "sendbird_group_channel_79129877_dd9423fd98ccc7580dd06677341d4dff6c70862c",
      loadMessage: 15,
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
    userId1: {
      handler: function (value) {
        const sendbirdAction = SendbirdAction.getInstance();
        if (value !== "user1") {
          sendbirdAction.init("김인태", this.channel);
        } else {
          sendbirdAction.init(this.userId1, this.channel);
        }
      },
    },
    userId2: {
      handler: function (value) {
        const sendbirdAction = SendbirdAction.getInstance();
        if (value !== "user2") {
          sendbirdAction.init("김인태", this.channel);
        } else {
          sendbirdAction.init(this.userId2, this.channel);
        }
      },
    },
    channel: {
      handler: function () {
        const sendbirdAction = SendbirdAction.getInstance();
        if (this.channel !== this.channel) {
          sendbirdAction.init(this.userId, this.channel1);
        } else {
          sendbirdAction.init(this.userId, this.channel2);
        }
      },
    },
  },
  methods: {
    addInputMessage: function (message) {
      this.messages.itemList = [message].concat(this.messages.itemList);
    },

    addInputFile: function (file) {
      console.log("hi", file.url);
      this.messages.itemList = [file].concat(this.messages.itemList);
    },
    handleScroll() {
      console.log("d");
    },
    clickcc() {
      this.loadMessage++;
      //메시지 리스트를 불러오는 메소드?
      const sendbirdAction = SendbirdAction.getInstance();
      sendbirdAction.getMessageList(this.loadMessage);
      const channelEvent = new SendBirdEvent();
      channelEvent.onMessageReceived((message) => {
        this.messages.itemList = [message].concat(this.messages.itemList);
      });
    },
  },
  //
  computed: {
    //sendbirdAction.getMessageList(this.loadMessage)
    //const sendbirdAction = SendbirdAction.getInstance();
  },
  async created() {
    const sendbirdAction = SendbirdAction.getInstance();
    const error = await sendbirdAction.init("김인태", this.channel);
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
