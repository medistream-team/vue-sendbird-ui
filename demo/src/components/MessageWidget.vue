<template>
  <div class="chat-container">
    <!-- <header-bar></header-bar> -->
    <!-- <file-import @fileSelect="addInputFile"></file-import> -->
    <message-input @addInputMessage="addInputMessage"></message-input>
    <message-log v-model="messages"></message-log>
  </div>
</template>

<script>
import MessageInput from '@/components/MessageInput'
import MessageLog from '@/components/MessageLog'

export default {
  name: 'MessageWidget',
  components: {
    MessageInput,
    MessageLog
  },
  props: {
    // sortDirection: {
    //   type: String,
    //   default: 'bottom'
    // }
  },
  // provide: {
  // },
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
  }
}
</script>

<style scoped>

</style>
