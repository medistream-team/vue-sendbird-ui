<template>
  <div class="file-import">
    <file-pond
      name="files"
      ref="fileref"
      credits=""
      label-idle="<span class='filepond--label-action'></span>"
      accepted-file-types="image/jpeg, image/png, application/pdf, application/docx"
      :allow-multiple="true"
      :allowBrowse="true"
      :allowDrop="false"
      server="http://localhost:3000/upload"
      v-bind:file="fileList"
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

export default {
  name: "FileImport",
  components: {
    FilePond,
  },
  data() {
    return {
      fileList: [],
    };
  },

  mounted() {
    setOptions({
      server: {
        url: "http://localhost:3000/",
        process: {
          url: "./upload",
          method: "POST",
          withCredentials: false,
          timeout: 7000,
          onload: (response) => {
            //console.log(JSON.parse(response));
            this.fileList = JSON.parse(response)[0].url;
          },
          onerror: null,
        },
      },
    });
  },

  methods: {
    handleFilePondInit: function () {
      console.log("FilePond has initialized");
    },

    handleOpenFile: function () {
      this.$refs.fileref.browse();
    },

    addDropFile: function (url) {
      this.$refs.fileref.addFile(url);
      console.log("ITISWORKING");
    },

    emitThis: function () {
      this.$emit("customChange", this.fileList);
      this.$refs.fileref.removeFile();
      //this.$refs.filedrag.removeFile();
    },
  },
};
</script>

<style>
.filepond--root {
  position: relative;
}

.filepond--drop-label {
  background-color: #f5f5f5;
  width: 5px;
}

.filepond--root .filepond--drop-label {
  min-height: 1em;
}
</style>
