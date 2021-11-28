<template>
  <div class="clearfix">
    <a-button @click="getPath('sql')">
      <FileAddOutlined />
      选择 要输出的SQL 文件
    </a-button>
    <a-button @click="getPath('output')">
      <FolderOpenOutlined />
      选择要输出的文件夹
    </a-button>
  </div>
</template>
<script lang="ts" setup>
import { FolderOpenOutlined, FileAddOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { ref } from "vue";

interface FileItem {
  uid?: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  preview?: string;
  originFileObj?: any;
  file?: string | Blob;
}

const selectFile = ref<FileItem>({});
const outputDir = ref<FileItem>({});
const uploading = ref<boolean>(false);

let    getPath = ()=>{

}


</script>
