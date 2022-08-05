<template>
  <div class="chat-container">
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
//import InfiniteLoading from "vue-infinite-loading";
import MessageInput from "@/components/MessageInput";
import MessageLog from "@/components/MessageLog";
import MessageHeader from "./MessageHeader.vue";
import { computed } from "vue";
import { SendbirdAction } from "@/sendbird/SendbirdAction";
import { SendBirdEvent } from "@/sendbird/SendbirdEvent";

export default {
  name: "MessageWidget",
  components: {
    //InfiniteLoading,
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

  provide() {
    return {
      msg: computed(() => {
        return this.messages; // 콜백 함수 형태로 return
      }),
    };
  },

  data() {
    return {
      showInfiniteLoadingIndicator: false,
      messages: {
        hasMoreMessage: false,
        itemList: [],
      },
      scrollElement: document.querySelector(".chat-container"),
      classValue: true,
      channel1:
        "sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed",
      channel2:
        "sendbird_group_channel_79129877_dd9423fd98ccc7580dd06677341d4dff6c70862c",
      loadMessage: 30,
      page: 1,
      list: [],
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
    convert() {},
    addInputMessage: function (message) {
      this.messages.itemList = [message].concat(this.messages.itemList);
    },

    addInputFile: function (file) {
      console.log("hi", file.url);
      this.messages.itemList = [file].concat(this.messages.itemList);
    },
    infiniteHandler($state) {
      //얼만큼 실행할 것인가. 채팅 내역 갯수만큼. <- 어떻게 구할 것인가?
      //
      console.log("dd");
      const sendbirdAction = SendbirdAction.getInstance();
      setTimeout(() => {
        sendbirdAction
          .getMessageList(this.loadMessage)
          .then((res) => {
            console.log(res.hasMoreMessage);
            const newItemList = this.messages.itemList.concat(res.itemList);
            this.messages = {
              hasMoreMessage: res.hasMoreMessage,
              itemList: newItemList,
            };
            $state.loaded();
          })
          .catch((e) => console.log(e));
      }, 1000);
    },
  },

  async created() {
    const sendbirdAction = SendbirdAction.getInstance();
    const error = await sendbirdAction.init(
      "김인태",
      this.nickname,
      this.channel
    );

    if (!error) {
      sendbirdAction
        .getMessageList(this.loadMessage)

        .then((response) => {
          this.messages = response;
          if (this.messages.hasMoreMessage) {
            setTimeout(() => {
              this.showInfiniteLoadingIndicator = true;
            }, 1000);
          }
        });

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
