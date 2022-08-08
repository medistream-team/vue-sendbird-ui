<template>
  <div class="chat-container">
    <!-- <header-bar></header-bar> -->
    <!--file-import @fileSelect="addInputFile"></file-import> -->

    <message-header></message-header>
  

    <message-input @addInputMessage="addInputMessage"
                   @addInputFile="addInputFile"
                   v-if="sortDirection === 'top'"
    >
    
      <!-- channel Id가 없을 때 페이지를 만들어보자!-->
    </message-input>

    <message-log
      :nickname="nickname"
      :userId="userId"
      :classValue="classValue"
      :sort-direction="sortDirection"
    > </message-log>

    <message-input @addInputMessage="addInputMessage"
                   @addInputFile="addInputFile"
                   v-if="sortDirection === 'bottom'"

    > </message-input>

    <message-input
      v-if="sortDirection === 'bottom'"
      @addInputMessage="addInputMessage"
      @addInputFile="addInputFile"
    ></message-input>
  </div>
</template>

<script>
import MessageInput from "@/components/MessageInput";
import MessageLog from "@/components/MessageLog";
import MessageHeader from "./MessageHeader.vue";



//import FileImport from "@/components/FileImport";
//import InfiniteLoading from "vue-infinite-loading";

import { SendbirdAction } from "@/sendbird/SendbirdAction";

export default {
  name: "MessageWidget",
  components: {

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
    };
  },

  //toggle button들 만들기
  watch: {
    sortDirection: {
      handler: function (value) {
        if (value !== "top") {
          this.messages.reverse();
        } else {
          this.messages.reverse();
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
    },

    addInputFile: function (file) {
      console.log("hi", file.url);
      this.messages = [file].concat(this.messages);
    },
  },
};
</script>

<style scoped></style>
