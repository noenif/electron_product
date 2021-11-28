<template>
  <a-config-provider :locale="locale">
    <a-page-header
      v-if="$route.meta"
      style="border: 1px solid rgb(235, 237, 240)"
      :title="$route.meta.name"
      :sub-title="$route.meta.desc"
      @back="() => $router.back()"
    />
    <router-view />
  </a-config-provider>
</template>
<script>
import zhCN from "ant-design-vue/es/locale/zh_CN";
export default {
  data() {
    return {
      locale: zhCN,
    };
  },
  created() {
    console.log(`$router.options:`);
  },
  methods: {},
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
