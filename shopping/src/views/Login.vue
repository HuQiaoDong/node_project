<template>
  <div class="login">
    <div class="form-area">
      <form class="form-horizontal">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-2 control-label">邮箱</label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              id="inputEmail3"
              placeholder="输入邮箱"
              v-model="userInfo.email"
            />

            <!-- :class="[verifyRes[0]?'correctTips':'errorTips']" -->
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              id="inputPassword3"
              placeholder="输入密码"
              v-model="userInfo.password"
            />
          </div>

          <!-- :class="[verifyRes[2]?'correctTips':'errorTips']" -->
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default submit" @click.prevent="login">登录</button>
            <!-- @click.prevent="uploadForm(userInfo)" -->
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <router-link to="/shopping/src/views/Register.vue">没有账号？立即注册</router-link>
            <!-- @click.prevent="uploadForm(userInfo)" -->
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
//导入表单验证文件
import { vaildForm } from "../js/vaildForm.js";
export default {
  name: "login",
  data() {
    return {
      userInfo: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      let that =this;
      this.axios
        .post("/login", {
          email:that.userInfo.email,
          password:that.userInfo.password
        })
        .then(result => {
          console.log('result ==> ', result);
          if (result.data.code == 1020) {
            this.$cookies.set("_abc", result.data.token, "5d");
            console.log('登录成功');
            this.$router.push({name:'Type'});
          }
        })
        .catch(err => {
          console.log("err ==> ", err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  background-image: url("../../public/images.jpeg");
  background-size: cover;
  display: flex;
  height: 100%;
  .form-area {
    padding: 20px;
    border-radius: 20px;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.3));
    margin: auto;
    width: 450px;
    // height: 450px;
    .btn {
      // background-color: white;
      color: white;
      border: 1px solid #ececec;
    }
    form {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
    .form-group {
      //   display: flex;
      .control-label {
        padding-top: 5px;
        padding-bottom: 5px;
        margin: 0px;
        vertical-align: middle;
      }
      &.code {
        display: flex;
        .codeInput {
          flex: 1.5;
        }
        .getCodeBtn {
          // width: 50%;
          flex: 1;
          position: relative;
          button {
            width: 90%;

            position: absolute;
            bottom: 0;
          }
        }
      }
    }
  }
}
#inputCode {
  // width: 100%;
  // flex: 3;
}
.submit {
  width: 100%;
  background: green;
}
input {
  outline: none;
}
@media (min-width: 576px) {
  .col-sm-10 {
    flex: 0 0 83.333333%;
    max-width: 100%;
  }
}
@media (min-width: 576px) {
  .col-sm-2 {
    flex: 0 0 16.666667%;
    max-width: 50%;
  }
}
.errorTips {
  border: 1px solid red;
}
.correctTips {
  border: 1px solid green;
}
</style>