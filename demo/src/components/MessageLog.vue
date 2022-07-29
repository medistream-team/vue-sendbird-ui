<template>
  <div class="chat-container">
    <ul v-if="msg.itemList.length > 0">
      <li
        class="chat-item"
        v-for="message in msg.itemList"
        :key="message.messageId"
      >
        <div style="white-space: pre-wrap">{{ message.message }}</div>
        <div>{{ message.messageId }}</div>
        <p>{{ convertDate(message.createdAt) }}</p>
      </li>
      <button @click="checkY">눌러임마</button>
      <button @click="testt">conso</button>
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
    checkY() {
      // filter해서 요소를 찾고, 그 위치로 이동하기위한 함수.
      const chat = document.querySelector(
        ".chat-container li:nth-child(4) div"
      );
      console.log(chat.innerText);
      //getBoundingClientRect().top
    },
    infiniteHandler() {},
    testt() {
      console.log(this.msg.itemList[0].message);
    },
  },
  provide() {
    return {
      title: "김인태",
    };
  },
  computed: {},
};
</script>

<style scoped></style>
