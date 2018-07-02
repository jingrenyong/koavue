<template>
  <div>
        <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goBack"
         />
         <div class="register-panel">
            <van-field 
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username=''"
            />

            <van-field 
                v-model="password"
                type="password"
                label="密码" 
                placeholder="请输入密码"
                required
               
            />
            <div class="register-button">
                <van-button type="primary" @click="loginAction" :loading='openLoading' size="large" >登录</van-button>
            </div>
         </div>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false //是否开启用户注册的Loading状态,防止用户重复提交
    };
  },
  created(){
    if (localStorage.get('userIngo')){

    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    loginAction() {
      if (this.checkForm) {
        this.axiosloginUser();
      }
    },
    axiosloginUser() {
      axios({
        url: "http://localhost:3000/user/login",
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.message) {
            //保存用户登录状态
            new Promise((resolve, reject) => {
              let users = { userName: this.username };
              localStorage.setItem("userInfo", users);
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch(err => {
                Toast.fail("登录状态保存失败");
                console.log(err,'登录状态错误')
              });
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>

