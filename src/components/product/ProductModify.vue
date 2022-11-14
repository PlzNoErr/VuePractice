<template>
  <div class="container">
    <h2>상세정보 수정</h2>
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
          v-model="product.pDesc"
        />
      </div>

      <div style="text-align: center"><br>
        <button
          type="submit"
          class="btn btn-outline-warning"
          @click.prevent="updateProduct"
          style="width: 120px; height: 45px; font-size: large"
        >
          상품수정
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
    updateProduct() {
      if(this.product.pCode===""||this.product.pName===""||this.product.price===""||this.product.quantity===""
      ||this.product.brand===""||this.product.pDesc===""){
        alert("모든 정보를 입력해 주세요!")
        return;
      }
      const URL = `http://localhost:9999/productapi/product`;
      axios({
        url: URL,
        method: "put",
        data: this.product
      })
        .then(() => {
          this.$router.push("/product/list");
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