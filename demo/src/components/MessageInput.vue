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

    <!--input
      v-show="ghostFileInputVisible"
      type="file"
      class="ghost-file-input"
      @input="handleNativeFileInput"-->

    <FileImport @customChange="handleFilesUpload" ref="fileSelect"></FileImport>

    <button v-if="message" @click="sendMessage">보내기</button>
    <input
      type="file"
      class="ghost-file-input-top"
      @input="handleNativeFileInput"
      ref="fileDrag"
      @click.prevent=""
    />
  </div>
</template>

<script>
import { SendbirdAction } from "@/sendbird/SendbirdAction";
import FileImport from "./FileImport.vue";
import axios from "axios";

export default {
  name: "MessageInput",
  components: { FileImport },
  data() {
    return {
      message: "",
      file: "",
      className: "",
      //ghostFileInputVisible: true,
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
    // handleMouseDown: function () {
    //   document.querySelectorAll('.chat-container')[0].addEventListener('mouseenter', this.handleMouseMove);
    // },
    // handleMouseMove: function (event) {
    //   console.log(event);
    // },

    handleNativeFileInput: function (event) {
      //let image = event.target.files[0];
      //console.log(event.target.files[0].url);
      this.$refs.fileSelect.addDropFile(event.target.files[0]);

      //axios.post('http://localhost:3000/uploads', {image})
      //.then(res => {
      // console.log(res.data)
      //})

      //const reader = new FileReader();
      //reader.readAsDataURL(image);
      //reader.onload = function (event) {
      //  console.log(event.target.result);
      //}
      //this.$refs.fileDrag.addDropFile(event.target.result);
      //console.log(event.target.files[0].name);
      //console.log(newFile);
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
      this.$refs.fileSelect.handleOpenFile();
    },

    test: function (e) {
      this.$refs.fileDrag.addDropFile(e);
    },

    localFileUpload: function () {
      axios.post("http://localhost:3000/upload").then((res) => {
        console.log(res.data);
      });
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

.ghost-file-input-top {
  position: fixed;
  top: 160px;
  left: 0px;
  right: 0px;
  bottom: -9999px;
  background-color: rgba(255, 0, 0, 0.1);
  text-indent: -9999px;
  /* pointer-events: none; */
}

.ghost-file-input-bottom {
  position: fixed;
  top: 110px;
  left: 0px;
  right: 0px;
  bottom: -3390px;
  background-color: rgba(255, 0, 0, 0.1);
  text-indent: -9999px;
  /* pointer-events: none; */
}

.file-send-button:hover {
  background-color: #e2e2e2;
}
</style>
