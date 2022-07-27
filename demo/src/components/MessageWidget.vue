<template>
  <div class="chat-container">
    <!-- <header-bar></header-bar> -->
    <file-import @fileSelect="addInputFile"></file-import> 
    <message-input @addInputMessage="addInputMessage"></message-input>
    <message-log v-model="msg"></message-log>
  </div>
</template>

<script>
import MessageInput from "@/components/MessageInput";
import MessageLog from "@/components/MessageLog";
import { computed } from "vue";
import { SendbirdAction } from '@/sendbird/SendbirdAction'
import { SendBirdEvent } from '@/sendbird/SendbirdEvent'

export default {
  name: "MessageWidget",
  components: {
    MessageInput,
    MessageLog,
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
    addInputFile: function (file) {
      this.messages.itemList = [file].concat(this.messages.itemList);
    }, 
  },
  
  async created() {
    const sendbirdAction = SendbirdAction.getInstance();
    const error = await sendbirdAction.init();

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
