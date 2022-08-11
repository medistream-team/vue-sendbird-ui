<template>
  <div class="message-header">
    <div v-if="!searchVisible" class="bar">
      <p class="title">{{ userId }}</p>
      <div class="tools left">
        <!-- <button type="button" title="뒤로가기">
          <i class="ii ii-arrow-left"></i>
        </button> -->
      </div>
      <div class="tools right" title="검색">
        <button type="button" @click="searchVisible = true">
          <i class="ii ii-search"></i>
        </button>
      </div>
    </div>
    <!-- 검색 -->

    <div v-if="searchVisible" class="tool-search">
      <input
        ref="search"
        type="search"
        v-model="searchKeyword"
        @change="searching"
        placeholder="메시지 내용 검색"
      />
      <button type="button" @click="searchVisible = false">
        <i class="ii ii-remove"></i>
      </button>
    </div>
  </div>
</template>

<script>
import "inticons/fonts/inticons.bundle.min.css";

export default {
  props: {
    userId: {
      type: String,
    },
  },
  inject: ["msg"],
  methods: {
    searching() {
      this.$emit("searching", this.searchKeyword);
    },
  },
  data() {
    return {
      searchKeyword: "",
      searchVisible: false,
    };
  },
};
</script>

<style scoped>
.message-header {
  position: relative;
  height: 50px;
  background-color: #e9e9e9;
}
.message-header .title {
  margin: 0;
  line-height: 50px;
  text-align: center;
}
.message-header .tools.left {
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
}
.message-header .tools.right {
  position: absolute;
  top: 0;
  right: 0;
  text-align: right;
}
.message-header .tools button {
  min-width: 50px;
  height: 50px;
  border: none;
  background: none;
  font-size: 22px;
  cursor: pointer;
}
.tool-search {
  position: absolute;
  top: 10px;
  right: 15px;
  left: 15px;
}
.tool-search input[type="text"]::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}
.tool-search input[type="text"]::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}
.tool-search input[type="search"]::-webkit-search-decoration,
.tool-search input[type="search"]::-webkit-search-cancel-button,
.tool-search input[type="search"]::-webkit-search-results-button,
.tool-search input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
.tool-search input {
  width: 100%;
  height: 30px;
  border: none;
  border-bottom: 1px solid rgba(150, 150, 150, 0.2);
  background: none;
  outline: none;
  font-size: 15px;
}
.tool-search button {
  position: absolute;
  top: -10px;
  right: -15px;
  width: 50px;
  height: 50px;
  border: none;
  background: none;
  font-size: 22px;
  cursor: pointer;
}
</style>
