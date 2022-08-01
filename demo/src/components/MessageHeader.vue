<template>
  <div class="header-container">
    <p>🕳user</p>
    <div class="glass-container">
      <i class="ii ii-search" @click="modalClick"></i>
      <input type="text" v-model="filteringText" v-if="modal" />
    </div>

    <p>{{ filteringText }}</p>

    <!-- {{ filteringText | messageFilter }}-->

    <div></div>
  </div>
</template>

<script>
import "inticons/fonts/inticons.bundle.min.css";

export default {
  data() {
    return {
      filteringText: "",
      test: "",
      modal: true,
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
  //  const chat = document.querySelector(
  //         ".chat-container li:nth-child(2) div"
  //       );
  //       console.log(chat.innerText);
  //       console.log(this.filteringNumber);
  //메세지 내용 itemList.message에서 filtering
  //ref?? 요소에 직접적으로 적어야함
  methods: {
    modalClick() {
      this.modal = !this.modal;
    },
  },
  computed: {},
};
</script>

<style scope>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: coral;
  position: relative;
}
.header-container p {
  margin-left: 20px;
}
.glass-container i {
  position: absolute;
  left: 100px;
  bottom: 15px;
  cursor: pointer;
}
</style>
