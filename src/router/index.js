import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginVue from '../views/LoginView.vue'
import BasketDetail from '../views/BasketDetail.vue'
import ProductMainView from '../views/ProductMainView.vue'
import ProductCreate from '../components/product/ProductCreate.vue'
import ProductList from '../components/product/ProductList.vue'
import ProductDetail from '../components/product/ProductDetail.vue'
import ProductModify from '../components/product/ProductModify.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginVue',
    component: LoginVue
  },
  {
    path: '/basket',
    name: 'BasketDetail',
    component: BasketDetail
  },
  {
    path: '/product',
    name: 'ProductMainView',
    component: ProductMainView,
    children: [
      {
        path: 'create',
        name: 'ProductCreate',
        component: ProductCreate
      },
      {
        path: 'list',
        name: 'ProductList',
        component: ProductList
      },
      {
        path: 'detail/:pCode',
        name: 'ProductDetail',
        component: ProductDetail
      },
      {
        path: 'modify/:pCode',
        name: 'ProductModify',
        component: ProductModify
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
