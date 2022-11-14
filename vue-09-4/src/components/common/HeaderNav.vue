<template>
<header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <router-link to="/" class="nav-link px-2" id="ttitle">쌰핑몰</router-link>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
          <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" class="nav-link px-2 text-white">About</a></li>
        </ul>

        <div class="text-end" v-if="LoginId">
          <button type="button" @click="logoutrequest" class="btn btn-outline-info me-2">로그아웃</button>
          <router-link to="/basket" type="button" class="btn btn-outline-light me-2">MY 장바구니</router-link>
        </div>
        <div class="text-end" v-else>
          <router-link to="/login" type="button" class="btn btn-outline-light me-2">로그인   
          </router-link>
          <button type="button" class="btn btn-outline-warning">회원가입</button>
        </div>
      </div>
    </div>
 </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed:{
    ...mapState([
    'LoginId',
    ]),
  },
  methods:{
    logoutrequest(){
      this.$store.commit("LOGOUTREQUEST")
      this.$router.go();
    }
  }
}
</script>

<style>
#ttitle{
  font-size: 25px;
  color: rgb(213, 210, 249);
  margin-left: 5px;
}

</style>