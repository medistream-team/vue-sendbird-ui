<template>
  <div class="input-container">
    <div class="file-send">아</div>
    <!-- File Upload -->
    <!-- Photo -->
    <!-- Emoji -->
    <textarea
      placeholder="새로운 메시지를 입력하세요..."
      v-model="message"
      @keydown.enter.exact.prevent="sendMessage"
    />
    <button v-if="message" @click="sendMessage">보내기</button>
  </div>
</template>

<script>
import { SendbirdAction } from "@/sendbird/SendbirdAction";

export default {
  name: "MessageInput",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage: function (event) {
      if (event.isComposing) {
        return;
      }
      SendbirdAction.getInstance()
        .sendUserMessage(this.message)
        .then((message) => {
          this.$emit("addInputMessage", message);
          this.message = "";
        });
    },
  },
};
</script>

<style scoped></style>
