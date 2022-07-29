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
        <p>{{ convertDate(message.createdAt) }}</p>

      </li>
    </ul>
  </div>
</template>

<script>

import { format } from "date-fns";

export default {
  name: "MessageLog",
  data() {
    return {};
  },
  

  inject: ["msg"],
  methods: {
    convertDate(date) {
      return format(date, "HH:mm");
    },
  },
 
};
</script>

<style scoped></style>