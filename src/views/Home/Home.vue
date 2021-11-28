<template>
  <div id="Home">
    <Modal v-model:visibleFlag="visibleFlag">
      <form-component
        ref="form"
        :schemas="schemas"
        v-bind="{ ...formCustom }"
        :componentCustom="componentCustom"
      ></form-component>
    </Modal>
    <a-button type="primary" @click="visibleFlag = true"
      >配置相关的信息</a-button
    >
    <a-button type="primary" @click="showModal">配置相关的信息</a-button>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
  defineProps,
  defineEmits,
  defineExpose,
  useSlots,
  useAttrs,
} from "vue";
import fileSelect from "@/components/fileSelect.vue";
import formComponent from "@/components/Form/index.vue";
import Modal from "@/components/Model/Modal.vue";
const props = defineProps({});
const emit = defineEmits([]);
const slots = useSlots();
const attrs = useAttrs();

let visibleFlag = ref(false);
defineExpose({});
let modelProps = ref({
  title: "项目持久层配置",
  visibleFlag,
});

let formCustom = ref({
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
});
let componentCustom = ref({
  ButtonProps: {
    display: false,
    rowProps: {
      type: "flex",
      justify: "center",
    },
    ButtonGroupProps: {
      confirm: {
        name: "查询",
        type: "primary",
        style: {
          width: "120px",
        },
        display: true,
        buttonMethod: (type, other, e) => {},
      },
    },
  },
});
let schemas = ref([
  {
    prop: "mapperPath",
    label: "Mapper路径",
    propType: "string",
    component: "a-input-search",
    colProps: {
      span: 20,
    },
    componentProps: {
      placeholder: "请选择Mapper目录",
      enterButton: "选择目录",
    },
    componentMethods: {
      search: (e) => {
        console.log(`e:`, e);
      },
    },
    icon: {
      name: "suffixIcon",
      type: "smile",
    },
  },
  {
    prop: "daoPath",
    label: "Dao层路径",
    propType: "string",
    component: "a-input-search",
    colProps: {
      span: 20,
    },
    componentProps: {
      placeholder: "请选择Dao层目录",
      enterButton: "选择目录",
    },
    componentMethods: {
      search: (e) => {
        console.log(`e:`, e);
      },
    },
    icon: {
      name: "suffixIcon",
      type: "smile",
    },
  },
]);
</script>

<style lang="scss"></style>
