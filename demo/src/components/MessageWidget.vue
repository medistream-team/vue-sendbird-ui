<template>
  <div class="chat-container">
    <!-- <header-bar></header-bar> -->
    <button @click="powerClick">ddddd</button>
    <message-header></message-header>
    <!-- <file-import @fileSelect="addInputFile"></file-import> -->
    <message-input @addInputMessage="addInputMessage"></message-input>
    <message-log v-model="msg"></message-log>
  </div>
</template>

<script>
import { SendbirdAction } from "@/sendbird/SendbirdAction";
import { SendBirdEvent } from "@/sendbird/SendbirdEvent";
import { computed } from "vue";
import MessageInput from "@/components/MessageInput";
import MessageLog from "@/components/MessageLog";
import MessageHeader from "./MessageHeader.vue";

export default {
  name: "MessageWidget",
  components: {
    MessageInput,
    MessageLog,
    MessageHeader,
  },
  props: {
    // sortDirection: {
    //   type: String,
    //   default: 'bottom'
    // }
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
    };
  },
  methods: {
    addInputMessage: function (message) {
      this.messages.itemList = [message].concat(this.messages.itemList);
    },
    powerClick() {
      console.log(this.messages.itemList[4].url);
    },
  },

  async created() {
    const sendbirdAction = SendbirdAction.getInstance("김인태");
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
    }
  },
};
</script>

<style scoped></style>
