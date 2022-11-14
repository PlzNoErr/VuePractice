<template>
  <div>
    <header-nav></header-nav>
    <router-view ></router-view>
    <common-footer></common-footer>
  </div>
</template>

<script>
import HeaderNav from "./components/common/HeaderNav.vue";
import CommonFooter from "./components/common/CommonFooter.vue";

export default {
  components: { HeaderNav, CommonFooter },
  created(){
    this.$store.dispatch("loginCheck");

  }
};
</script>

<style>
</style>