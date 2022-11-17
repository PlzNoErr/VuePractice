import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LoginId : "",

  },
  getters: {

  },
  mutations: {
    LOGIN_CHECK(state, userinfo){
      state.LoginId = userinfo;
    },
    LOGOUTREQUEST(state){
      localStorage.removeItem("loginInfo");
      state.LoginId = "";
    },

  },
  actions: {
    loginCheck({commit}){
      let data = localStorage.getItem("loginInfo");
      if(data){
        commit("LOGIN_CHECK", data);
      }
    },
    loginRequest({commit}, payload){
      const URL = `http://localhost:9999/userapi/login`;
      axios({
        url: URL,
        method: 'POST',
        data: {
          "userId": payload.id,
          "userPass": payload.password
        }
      })
        .then((res) => {
          if(res.data.userId){
            localStorage.setItem("loginInfo",res.data.userId)
            alert("로그인 성공!")
            commit("LOGIN_CHECK", res.data.userId);
            router.push("/");
            return;
          }
          alert("아이디와 비밀번호를 확인해 주세요!")
        })
        .catch((err) => console.log(err));
      
    },
      
    

  },
  
  modules: {
  },
});
