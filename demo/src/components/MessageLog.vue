<template>
  <div class="message-log">
    <ul v-if="messages.itemList.length > 0">
      <li
        class="chat-item"
        v-for="message in messages.itemList"
        :key="message.messageId"
      >
        <p>{{ message.sender.nickname }}</p>
        <div style="white-space: pre-wrap">{{ message.message }}</div>
        <p>{{ convertDate(message.createdAt) }}</p>
      </li>
    </ul>
    <button @click="more" v-if="messages.hasMoreMessage">더보기</button>
  </div>
</template>

<script>
import { SendbirdAction } from '@/sendbird/SendbirdAction'
import { SendBirdEvent } from '@/sendbird/SendbirdEvent'
import { format } from 'date-fns'

export default {
  name: 'MessageLog',
  data() {
    return {
      messages: {
        hasMoreMessage: false,
        itemList: [],
      },
    };
  },
  methods: {
    more: function () {
      SendbirdAction.getInstance()
        .getMessageList()
        .then((response) => {
          this.messages.hasMoreMessage = response.hasMoreMessage;
          this.messages.itemList = this.messages.itemList.concat(
            response.itemList
          );
        });
    },
    convertDate(date) {
      return format(date, "yyyy년 M월 dd일 HH:mm");
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
    }
  },
}
</script>

<style scoped>

</style>
  