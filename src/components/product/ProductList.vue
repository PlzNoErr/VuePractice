<template>
  <div class="container">
    <h2>상품 리스트</h2>
    <br />
    <div class="container2">
      <span style="margin-left: 16px">검색대상 :</span>
      <select
        class="form-select"
        aria-label="Disabled select example"
        id="selectbar"
        v-model="searchcondition.key"
      >
        <option selected value="">없음</option>
        <option value="pName">상품명</option>
        <option value="pCode">상품코드</option>
        <option value="brand">브랜드</option>
      </select>
      <span>정렬기준 :</span>
      <select
        class="form-select"
        aria-label="Disabled select example"
        id="selectbar"
        v-model="searchcondition.orderBy"
      >
        <option selected value="">없음</option>
        <option value="pName">상품명</option>
        <option value="price">가격</option>
      </select>
      <span>정렬순서 :</span>
      <select
        class="form-select"
        aria-label="Disabled select example"
        id="selectbar"
        v-model="searchcondition.orderByDir"
      >
        <option selected value="">없음</option>
        <option value="DESC">오름차순</option>
        <option value="ASC">내림차순</option>
      </select>
      <input
        id="searchsearch"
        placeholder="키워드를 입력해 주세요"
        v-model="searchcondition.word"
      />
      <div style="display: inline; position: relative; top: -3px">
        <a class="btn btn-outline-success" id="butt" @click.prevent="movePage(1)">검색</a>
      </div>
    </div>
    <br />
    <hr />
    <hr />

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">코드번호</th>
          <th scope="col">상품명</th>
          <th scope="col">가격</th>
          <th scope="col">브랜드</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>
            <router-link :to="`/product/detail/${product.pCode}`">{{
              product.pCode
            }}</router-link>
          </td>
          <td>{{ product.pName }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.brand }}</td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example" style="display: inline-block">
      <ul class="pagination">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click="movePage(1)"
          >
            <span aria-hidden="true">◀</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span
              aria-hidden="true"
              @click.prevent="movePage(navigation.currentPage - 1)"
              >◁</span
            >
          </a>
        </li>
        <li
          class="page-item"
          v-for="index in pagetry"
          :key="index"
          :class="{
            active: navigation.startPage + index - 1 === navigation.currentPage,
          }"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="movePage(navigation.startPage + index - 1)"
          >
            {{ navigation.startPage + index - 1 }}</a
          >
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="movePage(navigation.currentPage + 1)"
          >
            <span aria-hidden="true">▷</span>
          </a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click="movePage(navigation.totalPageCount)"
          >
            <span aria-hidden="true">▶</span>
          </a>
        </li>
      </ul>
    </nav>

    <div style="text-align: left">
      <router-link to="/product/create" class="btn btn-outline-info" id="btns"
        >상품등록</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      products: {},
      navigation: { startPage: 0, endPage: 0, totalPageCount: 0 },
      searchcondition: { key: "", orderBy: "", orderByDir: "", word: "" },
    };
  },

  methods: {
    movePage(curpage) {
      let info = this.searchcondition;
      if (this.searchcondition.key === "") {
        info.key = "none";
      }
      if (this.searchcondition.orderByDir === "") {
        info.orderByDir = "none";
      }
      if (this.searchcondition.orderBy === "") {
        info.orderBy = "none";
      }

      if (curpage === 0) {
        curpage = 1;
      }
      if (curpage > this.navigation.totalPageCount) {
        curpage = this.navigation.totalPageCount;
      }

      const URL = `http://localhost:9999/productapi/product`;
      axios({
        url: URL,
        method: "GET",
        params: {
          currentPage: curpage,
          key: info.key,
          orderBy: info.orderBy,
          orderByDir: info.orderByDir,
          word: info.word,
        },
      })
        .then((res) => {
          this.products = res.data.products;
          this.navigation = res.data.navigation;
        })
        .catch((err) => console.log(err));
    },
  },

  created() {
    const URL = `http://localhost:9999/productapi/product`;
    axios({
      url: URL,
      method: "GET",
    })
      .then((res) => {
        this.products = res.data.products;
        this.navigation = res.data.navigation;
      })
      .catch((err) => console.log(err));
  },

  computed: {
    pagetry: function () {
      return this.navigation.endPage - this.navigation.startPage + 1;
    },
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
.container2 {
  text-align: center;
  margin: 0 auto;
  display: block;
  box-shadow: 1px 1px 1px 2px rgb(214, 223, 225);
  border-radius: 25px;
}
#selectbar {
  width: 150px;
  height: 40px;
  text-align: center;
  display: inline-block;
  margin: 20px 20px 20px 5px;
}
#searchsearch {
  box-sizing: border-box;
  width: 400px;
  height: 40px;
  display: inline-block;
  border: 1px solid rgb(119, 183, 214);
  border-radius: 25px;
  text-align: center;
}
#butt {
  height: 40px;
  width: 80px;
  margin: 20px;
  display: inline-block;
}

#btns {
  margin: 5px;
  font-size: 20px;
}
#pagebutton {
  margin: 1px;
  width: 35px;
  text-align: center;
}

input:focus {
  outline: 1px solid rgb(108, 107, 171);
}
</style>