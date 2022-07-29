<template>
  <div class="chat-header">
    <p>🕳user</p>
    <input type="text" v-model="filteringText" />
    <p>{{ filteringText }}</p>

    <!-- {{ filteringText | messageFilter }}-->

    <div></div>
  </div>
</template>

<script>
//

export default {
  data() {
    return {
      filteringText: "",
      test: "",
    };
  },
  inject: ["msg"],

  filters: {
    messageFilter() {
      return this.msg.itemList
        .map((message) => message.message)
        .filter((num) => {
          return num.toLowerCase().includes(this.filteringText.toLowerCase());
        });
    },
  },

  methods: {
    click() {
      //메세지 내용 itemList.message에서 filtering
      //ref?? 요소에 직접적으로 적어야함.
      const chat = document.querySelector(
        ".chat-container li:nth-child(2) div"
      );
      console.log(chat.innerText);
      console.log(this.filteringNumber);
    },
  },
  computed: {},
};
</script>

<style scope></style>
