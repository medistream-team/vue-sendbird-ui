<template>
  <div class="message-log">
    <div v-if="msg.length > 0">
      <div
        v-bind:class="[classValue ? 'chat-item me' : 'chat-item stranger']"
        v-for="message in msg"
        :key="message.messageId"
      >
        <p>{{ message.sender.nickname }}</p>

        <div style="white-space: pre-wrap">{{ message.message }}</div>

        <img
          v-if="message.url && checkType(message.url.toString())"
          class="file-img"
          v-bind:src="message.url"
        />

        <img
          v-if="message.url && !checkType(message.url.toString())"
          class="file-file"
          src="@/assets/file.png"
        />
        <a
          v-if="message.url && !checkType(message.url.toString())"
          class="file-filename"
          :href="message.url"
        >
          {{ message.url }}
        </a>

        <p>{{ convertDate(message.createdAt) }}</p>
      </div>
      <infinite-loading @infinite="infiniteHandler"> </infinite-loading>
    </div>
  </div>
</template>
<!-- 
<p>{{ convertDate(message.createdAt) }}</p>
 <button @click="more" v-if="messages.hasMoreMessage">더보기</button>
 const chat = document.querySelector(
        ".chat-container li:nth-child(4) div"
      );
  nickname 과 message.nickname이 같을 때 list에 class를 준다
  어떻게 줄것? 
-->
<script>
import { format } from "date-fns";
import InfiniteLoading from "vue-infinite-loading";
import { SendbirdAction } from "@/sendbird/SendbirdAction";

export default {
  components: {
    InfiniteLoading,
  },

  name: "MessageLog",

  props: {
    sortDirection: {
      type: String,
      default: "top",
    },
    classValue: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      default: "admin",
    },
    nickname: {
      type: String,
      default: "nickname",
    },
  },
  data() {
    return {
      messages: [],
      loadMessage: 15,
      timestamp: 0,
    };
  },
  inject: ["msg"],
  methods: {
    convertDate(date) {
      return format(date, "yyyy-MM-dd HH:mm");
    },
    checkType(fileUrl) {
      if (
        fileUrl.includes("jpeg") ||
        fileUrl.includes("png") ||
        fileUrl.includes("jpg")
      ) {
        return true;
      } else {
        return false;
      }
    },

    infiniteHandler($state) {
      const sendbirdAction = SendbirdAction.getInstance();

      setTimeout(() => {
        sendbirdAction
          .getMessageList(this.loadMessage)
          .then((res) => {
            console.log(res);

            this.loadMessage += 20;
            //const newItemList = this.messages.push(...res);
            this.msg.push(...res);

            $state.loaded();
          })
          .catch(() => $state.complete());
      }, 1000);
    },
  },

  //어떻게 비교하느냐. -> 현재 userId 파악 -> itemList를 순회해서 msg.itemList[0]._sender.userId이
  //this.userId와 다르면 각각 다른  요소에 class를 준다. userId = userId 이면 .me
  //다르면 stranger
  // if (this.nickname === this.messages[0]._sender.nickname) {
  //    console.log("dd");
  //  }
};
</script>

<style scoped>
.file-img {
  width: 150px;
}

.file-file {
  width: 30px;
}

.file-filename {
  font-size: 15px;
}

.chat-item {
  position: relative;
  width: 250px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  list-style-type: none;
}

.me {
  float: right;
  margin-left: 30px;
  background: #fef01b;
}

.stranger {
  float: left;
  margin-right: 30px;
  background: white;
}
</style>
