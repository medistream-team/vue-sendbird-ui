<template>
  <div class="file-import">
    <file-pond
      name="files"
      credits=""
      label-idle="드래그 앤 드롭 or <span class='filepond--label-action'>파일찾기</span>"
      accepted-file-types="image/jpeg, image/png"
      :allow-multiple="true"
      v-on:init="handleFilePondInit"
    >
    </file-pond>
  </div>
</template>

<script>
import vueFilePond, { setOptions } from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

// eslint-disable-next-line no-unused-vars
let imgUrl = "";

setOptions({
  server: {
    url: "http://localhost:3000/",
    process: {
      url: "./upload",
      method: "POST",
      withCredentials: false,
      timeout: 7000,
      onload: (response) => {
        console.log(JSON.parse(response));
        imgUrl = JSON.parse(response)[0].url;
      },
      onerror: null,
    },
  },
});

export default {
  name: "FileImport",
  components: {
    FilePond,
  },
  data() {
    return {};
  },

  methods: {
    handleFilePondInit: function () {
      console.log("FilePond has initialized");
    },
  },
};
</script>
