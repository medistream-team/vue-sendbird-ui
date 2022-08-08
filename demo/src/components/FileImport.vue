<template>
  <div class="file-import">
    <file-pond
      name="files"
      ref="fileref"
      credits=""
      label-idle="<span class='filepond--label-action'>file</span>"
      accepted-file-types="image/jpeg, image/png"
      :allow-multiple="true"
      v-on:init="handleFilePondInit"
      v-on:processfiles="emitThis"
    >
    </file-pond>

    <!--button @click="emitThis"> sendFile </button>  -->
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

    emitThis: function () {
      this.$emit("customChange", this.fileList);
      this.$refs.fileref.removeFile();
    },
  },
};
</script>

<style scoped></style>
