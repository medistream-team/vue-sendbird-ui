<template>
  <div class="chat-header">
    <p>🕳user</p>
    <input type="text" />

    <button @click="click">dddd</button>
  </div>
</template>

<script>
// 

export default {
  data() {
    return {};
  },
  inject: ["msg"],
  methods: {
    click() {
      //메세지 내용 itemList.message에서 filtering
      console.log(this.msg.itemList[0].message);
    },
  },
};
</script>

<style scope>
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  border: 1px solid #ceccce;
  font-size: 20px;
}
.chat-header p {
  margin-left: 20px;
}
.chat-header input {
  width: 250px;
  height: 30px;
  margin-right: 30px;
}
</style>
