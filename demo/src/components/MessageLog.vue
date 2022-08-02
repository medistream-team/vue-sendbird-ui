<template>
  <div class="message-log">
    <ul v-if="msg.itemList.length > 0">
      <li
        class="chat-item"
        v-for="message in msg.itemList"
        :key="message.messageId"
      >
        <p>{{ message.sender.nickname }}</p>
        <!--nickname이 다르면 ? (내 닉네임은 오른쪽 다르면 왼쪽 색깔도 다르게해보자
        어떤 것과 비교할껀가요? userId? 같지않았을 떄 다른 class를 주자!
        버튼도 컴포넌트로 만들어서 사진이 올라왔을 때 사진전송으로 바뀌는 버튼을 만들면 어떨까?
        링크처럼 만드는게 어떨까? user toggle, channel id toggle
        검색하는 sendbird function 을 찾아보고 모르면 질문하기.
        )-->

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
      </li>
    </ul>
  </div>
</template>
<!-- 
<p>{{ convertDate(message.createdAt) }}</p>
 <button @click="more" v-if="messages.hasMoreMessage">더보기</button>
-->
<script>
import { format } from "date-fns";

export default {
  name: "MessageLog",
  data() {
    return {};
  },

  inject: ["msg"],
  props: {
    sortDirection: {
      type: String,
      default: "top",
    },
  },
  methods: {
    convertDate(date) {
      return format(date, "yyyy-MM-dd HH:mm");
    },

    // if true, then image
    // if false, then document
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
  },
  provide() {
    return {
      title: "김인태",
    };
  },
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
  width: 250px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  list-style-type: none;
  background-color: gray;
  color: white;
}
</style>
