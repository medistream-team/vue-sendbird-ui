<template>
  <div class="input-container">
    <div class="file-send">
      <button class="file-send-button" @click="trigger">
        <i class="ii ii-attachment"> </i>
      </button>

      <!-- File Upload -->
      <!-- <file-import></file-import> -->
      <!--<FileImport @customChange = "printthis"></FileImport>-->
      <!--FileImport @customChange = "handleFilesUpload"></FileImport> -->
      <!--FileImport @customChange = "sendMessage"></FileImport> --->
      <!-- Photo -->
      <!-- Emoji -->

      <textarea
        class="text-input"
        placeholder="새로운 메시지를 입력하세요..."
        v-model="message"
        @keydown.enter.exact.prevent="sendMessage"
      />
    </div>

    <FileImport @customChange="handleFilesUpload" ref="fileSelect"></FileImport>
    <button v-if="message" @click="sendMessage">보내기</button>
  </div>
</template>

<script>
import { SendbirdAction } from "@/sendbird/SendbirdAction";
import FileImport from "./FileImport.vue";

export default {
  name: "MessageInput",
  components: { FileImport },
  data() {
    return {
      message: "",
      file: "",
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

    handleFilesUpload: function (event) {
      this.file = event;
      console.log(event);
      SendbirdAction.getInstance()
        .sendFileMessage(this.file)
        .then((file) => {
          this.$emit("addInputFile", file);
        });
    },

    trigger: function () {
      this.$refs.fileSelect.browse();
      console.log("hi!");
    },
  },
};
</script>

<style scoped>
.text-input {
  width: 100%;
}
.file-send {
  display: flex;
}

.text-input {
  display: flex;
  border: 1px solid#E6E6E6;
  resize: none;
}

.file-send-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid#E6E6E6;
  background-color: white;
  width: 50px;
  cursor: pointer;
}

.file-send-button:hover {
  background-color: #e2e2e2;
}
</style>
