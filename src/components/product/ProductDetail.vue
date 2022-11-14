<template>
  <div class="container">
    <h2>상품 상세</h2>
    <br />
    <form>
      <div class="input-group mb-3">
        <span
          class="input-group-text"
          id="inputGroup-sizing-default"
          style="width: 105px"
        >
          상품 코드
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          readonly
          v-model="product.pCode"
        />
      </div>
      <div class="input-group mb-3">
        <span
          class="input-group-text"
          id="inputGroup-sizing-default"
          style="width: 105px"
        >
          상품 이름
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          readonly
          v-model="product.pName"
        />
      </div>
      <div class="input-group mb-3">
        <span
          class="input-group-text"
          id="inputGroup-sizing-default"
          style="width: 105px"
        >
          가 격
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          readonly
          v-model="product.price"
        />
      </div>
      <div class="input-group mb-3">
        <span
          class="input-group-text"
          id="inputGroup-sizing-default"
          style="width: 105px"
        >
          수 량
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          readonly
          v-model="product.quantity"
        />
      </div>
      <div class="input-group mb-3">
        <span
          class="input-group-text"
          id="inputGroup-sizing-default"
          style="width: 105px"
        >
          브랜드
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          readonly
          v-model="product.brand"
        />
      </div>
      <div class="input-group mb-3">
        <span
          class="input-group-text"
          id="inputGroup-sizing-default"
          style="width: 105px"
        >
          상품 설명
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          readonly
          v-model="product.pDesc"
        />
      </div>
      <div style="text-align: left">
        <router-link
          :to="`/product/modify/${product.pCode}`" 
          class="btn btn-outline-warning"
          style="width: 110px; height: auto; font-size: 20px; margin-top: 10px"
        >
          상품수정
        </router-link>
        <button
          class="btn btn-outline-danger"
          @click.prevent="deleteProduct"
          style="
            width: 110px;
            height: auto;
            font-size: 20px;
            margin-top: 10px;
            margin-left: 10px;
          "
        >
          상품삭제
        </button>
        <router-link
          to="../list"
          class="btn btn-outline-success"
          style="
            width: 110px;
            height: auto;
            font-size: 20px;
            margin-top: 10px;
            margin-left: 10px;
          "
          >상품목록</router-link
        >
        <button
          class="btn btn-outline-primary"
          @click.prevent="addBasket"
          style="
            width: 150px;
            height: auto;
            font-size: 20px;
            margin-top: 10px;
            margin-left: 10px;
          "
          v-if="this.$store.state.LoginId"
        >
          장바구니등록
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      product: {
        pCode: "",
        pName: "",
        price: "",
        quantity: "",
        brand: "",
        pDesc: "",
      },
    };
  },

  methods: {
    deleteProduct() {
      const URL = `http://localhost:9999/productapi/product/${this.product.pCode}`;
      if (confirm("정말로 삭제하시겠습니까?")) {
        axios({
          url: URL,
          method: "DELETE",
        })
          .then(() => {
            this.$router.push("/product/list");
          })
          .catch((err) => console.log(err));
      }
    },

    addBasket() {
      const URL = `http://localhost:9999/basketapi`;
      let productinfo = {userId: this.$store.state.LoginId, pCode: this.product.pCode,};
      axios({
        url: URL,
        method: "POST",
        data: productinfo
      })
        .then(() => {
          this.$router.push("/basket");
        })
        .catch((err) => console.log(err));
    },
  },

  created() {
    const URL = `http://localhost:9999/productapi/product/${this.$route.params.pCode}`;
    axios({
      url: URL,
      method: "GET",
    })
      .then((res) => {
        this.product = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.container {
  padding-top: 30px;
  text-align: center;
  width: 700px;
  height: 500px;
  margin: 0 auto;
  display: block;
}
</style>