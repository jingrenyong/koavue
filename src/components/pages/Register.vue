<template>
  <div>
        <van-nav-bar
            title="用户注册"
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
                <van-button type="primary" @click="axiosRegisterUser" :loading='openLoading' size="large" >马上注册</van-button>
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
      openLoading: false ,//是否开启用户注册的Loading状态,防止用户重复提交
      usernameErrorMsg:'',
      passwordErrorMsg:'',
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    checkForm(){
      let isok=true
      if (this.username.length < 5){
        this.usernameErrorMsg = '用户名不能小于5位'
        isok = false
      }else{
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6){
        this.usernameErrorMsg = '密码不能小于6位'
        isok = false
      }else{
        this.usernameErrorMsg = ''
      }
      return isok
    },
    registerAction(){
      if (this.checkForm){
        this.axiosRegisterUser()
      }
    },
    axiosRegisterUser() {
      axios({
        url: "http://localhost:3000/user/register",
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code==200){
          Toast.success("注册成功");
          this.$router.push('/')
          }else{
            Toast.fail("注册失败");
            this.openLoading=false
          }
        })
        .catch(error => {
          console.log(error);
          Toast.fail("注册失败");
           this.openLoading=false
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

