<template>
  <div class="chat-container">
    <ul v-if="msg.itemList.length > 0">
      <li
        class="chat-item"
        v-for="message in msg.itemList"
        :key="message.messageId"
      >
        <div style="white-space: pre-wrap">{{ message.message }}</div>
        <p>{{ convertDate(message.createdAt) }}</p>
      </li>
      <button @click="moreMessage" v-if="msg.hasMoreMessage">더보기</button>
    </ul>
    <infinite-loading
      @infinite="infiniteHandler"
      spinner="bubbles"
    ></infinite-loading>
  </div>
</template>
<!-- 
<p>{{ convertDate(message.createdAt) }}</p>
 <button @click="more" v-if="messages.hasMoreMessage">더보기</button>
-->
<script>
import { format } from "date-fns";
import InfiniteLoading from "vue-infinite-loading";
import { SendbirdAction } from "@/sendbird/SendbirdAction";

export default {
  components: {
    InfiniteLoading,
  },
  name: "MessageLog",
  data() {
    return {
      page: 1,
      limit: 0,
    };
  },
  inject: ["msg"],
  methods: {
    convertDate(date) {
      return format(date, "HH:mm");
    },
    addInputMessage: function (message) {
      this.messages.itemList = [message].concat(this.messages.itemList);
    },
    Clcick() {
      console.log(this.msg.hasMoreMessage);
    },
    infiniteHandler() {},
    moreMessage() {
      SendbirdAction.getInstance()
        .getMessageList()
        .then((response) => {
          this.messages.hasMoreMessage = response.hasMoreMessage;
          this.messages.itemList = this.messages.itemList.concat(
            response.itemList
          );
        });
    },
  },

  computed: {
    messageFilter() {
      return this.msg.filter((msg) =>
        msg.itemList.sort(function (a, b) {
          return a.messageId - b.messageId;
        })
      );
    },
  },
};
</script>

<style scoped>
.chat-item {
  position: relative;
  width: 320px;
  padding: 25px;
  margin: 25px;
  border-radius: 15px;
  background-color: #1d77ff;
  color: white;
  list-style: none;
  font-size: 16px;
}
.chat-item p {
  position: absolute;
  bottom: -10px;
  right: 0;
  margin-right: -50px;
  color: #000;
}
</style>
