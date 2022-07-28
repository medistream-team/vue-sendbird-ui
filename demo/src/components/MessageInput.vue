<template>
  <div>
    <!-- File Upload -->
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

},

};

</script>

<style scoped>

</style>
