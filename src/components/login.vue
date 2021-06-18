<template>
<div id="app">
    <!-- <img src="./assets/logo.png"> -->
        <div class="login-container">          
    <div class="login-inner-box">
       <!-- <canvas id="root" width="" height="560" class="art-canvas"></canvas> -->
           <div class="login-form">
               <!-- <img src="./../assets/images/login-logo.png" alt="" class="login-img"> -->
                  <div class="val user-after">
                    <input type="text" autocomplete="off" placeholder="用户名"
                       v-model="username"
                       @blur="requireUserName"
                       @keyup.enter="login"
                       @change="GetUserAccountInfo"
                       
                       class="login-input user">
                    <label id="userName"></label>                  
                </div>
                 <div class="val pwd-after">
                    <input type="password" autocomplete="new-password" placeholder="密码"
                      v-model="password"
                       @blur="requirePwd"
                       @keyup.enter="login"
                       @change="GetUserSecretInfo"
                       class="login-input user">
                    <label id="pwd"></label>
                </div>
                <div>
                
 <el-button :loading="loading"  class="login-input login-btn" @click="login" id="login">
     <!-- <router-link to="/Home/123">{{loginFont}}</router-link> -->
     {{loginFont}}
 </el-button>
                </div>
                

           </div>

    </div>
   <div class="fixed-bar">
       <p>ICP备案号：赣ICP备13005266号</p>
       <p>Powered by JeeCms Copyright © 2007-2017 www.jeecms.com, All Rights Reserved</p>
   </div>
  </div>
</div>

</template>

<script>
import $ from 'jquery'
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome',
       loginFont:"登录",
        loading:false, 
       params: {
        userName: "",
        password: "" 
      },
      username: localStorage.getItem('userName')?localStorage.getItem('userName'):'420103197804063213',
			password: localStorage.getItem('password')?localStorage.getItem('password'):'1qaz2x3c',
    }
  },
  
   methods:{
     GetUserAccountInfo(e) {
			 const { value } = e.target;
        console.log("检测到变化name"+value);
			this.username=value
     localStorage.setItem("userName", value);
			},
			GetUserSecretInfo(e) {
			const { value } = e.target;
        console.log("检测到变化psw"+value);
			this.password=value
      localStorage.setItem("password", value);
			},
    
      requireUserName(){
      if (this.params.userName == "") {
        $("#userName")
          .addClass("error")
          .text("请填写用户名");
      } else {
        $("#userName")
          .removeClass("error")
          .text(" ");
      }
      },
       requirePwd(){
           if(this.params.password=="")
           {
             $("#pwd")
             .addClass("error")
             .text("请输入密码")
           }
           else{
             $("#pwd")
             .addClass("error")
             .text(" ")
           }
      },
       login(){
       this.loading=true;
      //  this.$router.push({name:'home',params:{id:123}})
      this.$axios(
        {
            method: 'POST',
						url: '/applets/login.jspx',
						params: {
							username: this.username,
							password: this.password
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						} //请求头的信息
					})
          .then((res)=>{
console.log('res=>',res)
              if(res.data.status==1){
                 this.loading=false;
                 localStorage.setItem("userData", JSON.stringify(res.data) );
               this.$router.push({name:'home',params:{data:res.data}})
              // this.$router.push('/Home')
              }
          })
          .catch((error)=>{
            console.error('error==>',error )
          })
      }
    },
     mounted() {
        console.log('login-router=>',this.$route.path+' '+this.$route.name)
     },
     
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
html{
  width: 100%;
}
input:focus{outline:none;}
.val {
  width: 320px;
  margin: 0 auto;
  position: relative;
  z-index: 99;
}
.user-after::after {
  position: absolute;
  top: 8px;
  right: 15px;
  color: #8ba6ba;
  font-family: "iconfont";
  font-size: 24px;
  content: "\e65e";
}
.pwd-after::after {
  position: absolute;
  top: 10px;
  right: 16px;
  color: #8ba6ba;
  font-family: "iconfont";
  font-size: 24px;
  content: "\e65f";
}
.val label {
  position: absolute;
  top: 14px;
  right: 0px;
  z-index: 999;
  color: #ff0000;
  transition: 0.25s right linear;
  transform: translate(0, 0);
  font-size: 12px;
}

.val label.error {
  right: 48px;
  transition: 0.5s right;
}
</style>
