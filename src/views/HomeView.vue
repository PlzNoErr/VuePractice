<template>
  <div class="container">
    <h2>쌰핑몰에 오신것을 환영합니다!!</h2>
    <router-link to="/product/list" class="btn btn-outline-success" id="btns">상품목록</router-link>
    <router-link to="/product/create" class="btn btn-outline-info" id="btns">상품등록</router-link>
    
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .container{
    padding-top: 20px;
    text-align: center;
  }
  #btns{
    margin: 10px;
    font-size: x-large;

  }
</style>