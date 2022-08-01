<template>
  <div class="message-log">
    <ul v-if="msg.itemList.length > 0">
      <li
        class="chat-item"
        v-for="message in msg.itemList"
        :key="message.messageId"
      >
        <p>{{ message.sender.nickname }}</p> 
        <div style="white-space: pre-wrap">{{ message.message }}</div>
        
        <img v-if="message.url && checkType(message.url.toString())" class="file-img" v-bind:src= message.url>

        <img v-if="message.url && !checkType(message.url.toString())" class="file-file" src= "@/assets/file.png">
        <a v-if="message.url && !checkType(message.url.toString())" class="file-filename" :href="message.url"> {{message.url}} </a>

        <p>{{ convertDate(message.createdAt) }}</p>

      </li>
    </ul>
  </div>
</template>
<!-- 
<p>{{ convertDate(message.createdAt) }}</p>
 <button @click="more" v-if="messages.hasMoreMessage">더보기</button>
-->
<script>
import { format } from "date-fns";
// import InfiniteLoading from "vue-infinite-loading";

export default {
  components: {
    // InfiniteLoading,
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
      return format(date, "yyyy-MM-dd HH:mm");
    },

    // if true, then image
    // if false, then document
    checkType(fileUrl) {
      if (fileUrl.includes('jpeg') || fileUrl.includes('png') || fileUrl.includes('jpg')) {
        return true;
      } else {
        return false;
      }
    }
  },
  provide() {
    return {
      title: "김인태",
    };
  },
  computed: {},
};
</script>

<style scoped>
  .file-img {
    width: 150px;
  }


  .file-file{
    width: 30px;
  }

  .file-filename {
    font-size: 15px;
  }

  .chat-item {
  width: 300px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  list-style-type: none;
  background-color: gray;
  color: white;
}

</style>
