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

<style scoped>
.input-container {
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 10;
  background-color: white;
  bottom: 0;
  height: 80px;
  width: 100%;
  border: 1px solid #ceccce;
}
.file-send {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 36px;
  height: 36px;
  border: 1px solid #ceccce;
}
textarea {
  background-color: white;
  width: 100%;
  height: 36px;
  border: 1px solid #ceccce;
}
</style>
