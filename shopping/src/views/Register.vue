<template>
  <div class="register">
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
              :class="[verifyRes[0]?'correctTips':'errorTips']"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputUsername3" class="col-sm-2 control-label">昵称</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputUsername3"
              placeholder="用户名"
              v-model="userInfo.nickname"
              :class="[verifyRes[1]?'correctTips':'errorTips']"
            />
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
              :class="[verifyRes[2]?'correctTips':'errorTips']"
            />
          </div>
        </div>
        <!-- 验证码 -->
        <div class="form-group code">
          <div class="codeInput">
            <label for="inputCode3" class="col-sm-2 control-label">验证码</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="inputCode3"
                placeholder="验证码"
                v-model="userInfo.verifyCode"
                :class="[verifyRes[3]?'correctTips':'errorTips']"
              />
            </div>
          </div>
          <div class="getCodeBtn">
            <button type="button" class="btn btn-info" @click="getEmailCode">{{text}}</button>
          </div>
        </div>

        <!-- <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <div class="checkbox">
              <label>
                <input type="checkbox" /> 记住密码
              </label>
            </div>
          </div>
        </div>-->
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button
              type="submit"
              class="btn btn-default submit"
              @click.prevent="uploadForm(userInfo)"
            >注册</button>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <router-link to="/login">已有账号？立即登录</router-link>
          </div>
        </div>
      </form>
    </div>
    <Toast></Toast>
  </div>
</template>

<script>
//导入消息提示组件
import Toast from "../components/Toast.vue";

//导入表单验证文件
import { vaildForm } from "../js/vaildForm.js";

export default {
  name: "Register",

  components: {
    Toast
  },
  data() {
    return {
      vaildForm: vaildForm,
      userInfo: {
        email: "",
        nickname: "",
        password: "",
        verifyCode: ""
      },

      text: "发送邮箱验证码",
      isSended: false,
      verifyRes: []
    };
  },
  methods: {
    //获取邮箱验证码
    getEmailCode() {
      // let data = {email: this.userInfo.email}
      // let res = vaildForm.valid(data);
      // if(res.pass == false){
      //   return;
      // }

      let that = this;
      let time = 5;
      this.text = `${time}s后重新发送`;
      this.isSend = true;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          timer = null;
          this.text = `发送邮箱验证码`;
          this.isSended = false;
        } else {
          time--;
          this.text = `${time}s后重新发送`;
        }
      }, 1000);

      //发送邮箱验证码
      this.axios
        .post("/sendMail", {
          email: that.userInfo.email
        })
        .then(function(response) {
          console.log("response", response);
        })
        .catch(function(error) {
          console.log("error", error);
        });
    },

    //注册验证提交
    uploadForm(userInfo) {
      this.verifyRes = vaildForm.verify(userInfo);
      let that = this;

      //注册验证
      let isPass = true;
      this.verifyRes.forEach(item => {
        if (!item) {
          isPass = false;
          return;
        }
      });

      //拦截
      if (!isPass || !this.verifyRes) {
        return;
      }

      //发起注册请求
      this.axios
        .post("/register", {
          email: that.userInfo.email,
          nickname: that.userInfo.nickname,
          password: that.userInfo.password,
          verifyCode: that.userInfo.verifyCode
        })
        .then(function(response) {
          console.log(response.data);
          let registerRes = response.data;
          if (registerRes.code == 1002) {
            this.$showToast({
              message: result.data.msg
            });
            // this.msg = '该邮箱已被注册'
            // this.verifyRes[0] = false;
          } else if (registerRes.code == 1000) {
            // this.msg = '注册成功';
            this.$showToast({
              message: result.data.msg
            });
            setTimeout(() => {
              that.$router.push("/login");
            }, 3000);
          } else if (registerRes.code == 1001) {
            this.$showToast({
              message: result.data.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.register {
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
    height: 450px;
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
