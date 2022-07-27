<template>
  <div>
    <!-- File Upload -->
       <file-pond
      name="test"
      ref="pond"
      label-idle="Drop files here..."
      v-bind:allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      v-bind:files="file"
      v-on:init="handleFilePondInit"
    />

    <!-- Photo -->
    <!-- Emoji -->
    <textarea
      placeholder="새로운 메시지를 입력하세요..."
      v-model="message"
      @keydown.enter.exact.prevent="sendMessage"
    />

    <button v-if= "message || file" @click="sendMessage">보내기</button>
  

  </div>
</template>

<script>
import { SendbirdAction } from '@/sendbird/SendbirdAction'
 // Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageEdit
);

export default {
  name: 'MessageInput',
  data() {
    return {
      message: '',
      file:'',
    }
  },
  methods: {
    sendMessage: function (event) {
      if (event.isComposing) {
        return
      }
      SendbirdAction.getInstance()
        .sendUserMessage(this.message)
        .then((message) => {
          this.$emit('addInputMessage', message)
          this.message = ''
        })
    },

/*
     handleFilesUpload: function (event) {

      this.file = event.target.files[0];

      SendbirdAction.getInstance()
      .sendFileMessage(this.file)
        .then((file) => {
          this.$emit('addInputFile', file)
        })
    },
*/
     handleFilePondInit: function () {
      console.log("FilePond has initialized");
    },
},
components: {
  FilePond,
},
};

</script>

<style scoped>

</style>
