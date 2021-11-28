<template>
  <a-calendar
    v-model:value="value"
    class="calendar"
    @select="handleSelect"
    @panelChange="handlePanelChange"
  >
    <template #dateCellRender="{ current }">
      <div class="events">
        <a-badge
          v-if="
            ListData(current).isRuned !== undefined &&
            ListData(current).isRuned !== null
          "
          :color="
            ListData(current).isRuned === true
              ? 'green'
              : ListData(current).isRuned === false
              ? 'gold'
              : ''
          "
          :text="
            ListData(current).isRuned === true
              ? '跑完'
              : ListData(current).isRuned === false
              ? '没跑'
              : ''
          "
        />
        <a-badge
          v-if="
            ListData(current).isRuned !== undefined &&
            ListData(current).isRuned !== null
          "
          :color="
            ListData(current).isRollTubed === true
              ? 'green'
              : ListData(current).isRollTubed === false
              ? 'red'
              : ''
          "
          :text="
            ListData(current).isRollTubed === true
              ? '没干'
              : ListData(current).isRollTubed === false
              ? '干了'
              : ''
          "
        />
        <a-badge
          v-if="
            ListData(current).isRuned !== undefined &&
            ListData(current).isRuned !== null
          "
          :color="
            ListData(current).YellowTableted === true
              ? 'green'
              : ListData(current).YellowTableted === false
              ? 'red'
              : ''
          "
          :text="
            ListData(current).YellowTableted === true
              ? '没看'
              : ListData(current).YellowTableted === false
              ? '看了'
              : ''
          "
        />
      </div>
    </template>
    <template #monthCellRender="{ current }">
      <div v-if="getMonthData(current)" class="notes-month">
        <section>{{ getMonthData(current) }}</section>
        <span>Backlog number</span>
      </div>
    </template>
  </a-calendar>
  <punkModal v-model="visible" :handleOK="handleOK">
    <a-checkbox v-model:checked="taskList.isRuned">今日完成跑步</a-checkbox>
    <a-checkbox v-model:checked="taskList.isRollTubed">今日没有B1</a-checkbox>
    <a-checkbox v-model:checked="taskList.YellowTableted"
      >今日没有看B2</a-checkbox
    >
  </punkModal>
</template>
<script setup>
import punkModal from "@/components/punkModal.vue";
import { computed, defineComponent, onMounted, ref } from "vue";
import moment from "moment";
import { ipcRenderer } from "electron";
let taskList = ref({
  isRuned: false,
  isRollTubed: false,
  YellowTableted: false,
});
let visible = ref(false);
let formatDay = ref(null);
let isFinished = ref(null);
let symbolType = (index) => {
  return Symbol(index);
};
let sendMessage = () => {
  let currentTime = moment().format("YYYY-MM");
  ipcRenderer.send("data-message", {
    searchString: currentTime,
    operateName: "findObject",
  });
};
const value = ref();

let handleSelect = (e) => {
  formatDay.value = e.format("YYYY-MM-DD");
  if (
    moment(formatDay.value).valueOf() + 48 * 60 * 60 * 1000 >=
      moment().valueOf() &&
    moment(formatDay.value).valueOf() <= moment().valueOf()
  ) {
    let find = listData.value.find((item) => item.date === formatDay.value);
    setState(
      find || {
        isRuned: false,
        isRollTubed: false,
        YellowTableted: false,
      }
    );
    visible.value = true;
  }
};

let handleOK = () => {
  ipcRenderer.send("data-message", {
    searchString: {
      date: formatDay.value,
      ...taskList.value,
    },
    operateName: "addObject",
  });
};

let setState = (data) => {
  console.log(`出发了set!`);

  Object.entries(data).forEach((item) => {
    taskList.value[item[0]] = item[1];
  });
};
ipcRenderer.on("accept-data", (event, arg) => {
  visible.value = false;
  setState({
    isRuned: false,
    isRollTubed: false,
    YellowTableted: false,
  });
  getListData();
});
ipcRenderer.on("accept-list", (event, arg) => {
  listData.value = arg;
});
let listData = ref([]);
let ListData = computed(() => {
  return (value) => {
    return (
      listData.value.find((item) => item.date === value.format("YYYY-MM-DD")) ||
      {}
    );
  };
});

let handlePanelChange = (e) => {
  let formatDay = e.format("YYYY-MM-DD");
};
const getListData = () => {
  let formatDay = moment().format("YYYY-MM");
  ipcRenderer.send("init_data", {
    searchString: {
      date: { $regex: new RegExp(`${formatDay}.*`, "g") },
    },
    operateName: "findCollection",
  });
};
getListData();
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};
</script>
<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
.calendar {
  max-width: 100%;
  max-height: 100%;
}
</style>
