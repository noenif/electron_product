<template>
  <div>
    <a-modal
      :title="attrs.title || '请取名'"
      v-model:visible="visible"
      ok-text="确认"
      cancel-text="取消"
      @ok="hideModal"
      @cancel="hideModal"
    >
      <slot></slot>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import {
  ref,
  createVNode,
  useSlots,
  useAttrs,
  defineProps,
  watch,
  defineEmits,
} from "vue";
import { Modal } from "ant-design-vue";
const attrs = useAttrs();
const visible = ref<boolean>(false);
const props = defineProps({
  visibleFlag: Boolean,
});
const emit = defineEmits(["update:visibleFlag"]);

watch(
  () => props.visibleFlag,
  () => {
    visible.value = props.visibleFlag;
  }
);

const hideModal = () => {
  emit("update:visibleFlag", false);
};
</script>
<style lang="scss">
.ant-modal-title {
  font-weight: 700;
  padding: 10px;
}
</style>
