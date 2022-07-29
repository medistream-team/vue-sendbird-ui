<template>
  <div class="chat-container">
    <!-- <header-bar></header-bar> -->

    <!-- <button v-on:click="toggle">toggle</button> -->
    <message-header></message-header>
    <!-- <file-import @fileSelect="addInputFile"></file-import> -->
    <file-import @fileSelect="addInputFile"></file-import>
    <message-input v-if="toggleValue" @addInputMessage="addInputMessage">
    </message-input>
    {{ sortDirection }}
    <message-log v-model="messages"> </message-log>
    <message-input v-if="!toggleValue" @addInputMessage="addInputMessage">
    </message-input>
  </div>
</template>

<script>
import { SendbirdAction } from "@/sendbird/SendbirdAction";
import { SendBirdEvent } from "@/sendbird/SendbirdEvent";
import { computed } from "vue";
import FileImport from "@/components/FileImport";
import MessageInput from "@/components/MessageInput";
import MessageLog from "@/components/MessageLog";
import MessageHeader from "./MessageHeader.vue";

export default {
  name: "MessageWidget",
  components: {
    FileImport,
    MessageInput,
    MessageLog,

    MessageHeader,
  },
  props: {
    sortDirection: {
      type: String,
      default: "top",
    },
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
      // toggleValue: false,
      messages: {
        hasMoreMessage: false,
        itemList: [],
      },
      loadMessage: Number,
    };
  },
  watch: {
    sortDirection: {
      immediate: true,
      handler: function (value) {
        console.log("메시지 정렬 방향: " + value);
      },
    },
  },
  methods: {
    addInputMessage: function (message) {
      this.messages.itemList = [message].concat(this.messages.itemList);
    },

    toggle() {
      this.messages.itemList.reverse();
      this.toggleValue = !this.toggleValue;
    },

    scroll() {
      const sendbirdAction = SendbirdAction.getInstance();
      sendbirdAction.getMessageList(this.loadMessage);
    },

    addInputFile: function (file) {
      this.messages.itemList = [file].concat(this.messages.itemList);
    },
  },

  async created() {
    const sendbirdAction = SendbirdAction.getInstance();
    const error = await sendbirdAction.init();

    // this.msg,,,,,

    if (!error) {
      sendbirdAction
        .getMessageList()

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
