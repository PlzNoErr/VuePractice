<template>
  <div class="container">
    <h2>나의 장바구니 정보</h2>
    <table v-if="baskets.length" style="margin: 0 auto">
      <thead>
        <th>번호</th>
        <th>상품코드</th>
        <th>상품이름</th>
        <th>가격</th>
        <th>삭제</th>
      </thead>
      <tbody v-for="(basket, index) in baskets" :key="index">
        <td>{{ index }}</td>
        <td>{{ basket.pCode }}</td>
        <td>{{ basket.pName }}</td>
        <td>\{{ basket.price }}</td>
        <td>
          <button class="btn btn-danger" @click="deletebasket(basket.basketId)">삭제</button>
        </td>
      </tbody>
    </table>
    <div v-else>
      <br><br>
      <h2>장바구니에 등록된 상품이 없습니다.</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      baskets: {},
    };
  },

  methods: {
    deletebasket(value) {
      const URL = `http://localhost:9999/basketapi/${value}`;
      axios({
        url: URL,
        method: "DELETE",
      })
        .then(() => {
          this.$router.go();
        })
        .catch((err) => console.log(err));
    },
  },

  created() {
    let userId = this.$store.state.LoginId;
    const URL = `http://localhost:9999/basketapi?userId=${userId}`;
    axios({
      url: URL,
      method: "GET",
    })
      .then((res) => {
        this.baskets = res.data;
      })
      .catch((err) => console.log(err));
  },

};
</script>

<style scoped>
.container {
  padding-top: 30px;
  text-align: center;
  margin: 0 auto;
  display: block;
}
th {
  padding-top: 40px;
  padding-bottom: 15px;
  width: 140px;
}
td {
  padding-bottom: 10px;
}
</style>