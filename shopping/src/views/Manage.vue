<template>
  <div class="manage">
    <div class="header">
      <div class="title">
        <h2>商品管理系统</h2>
      </div>

      <div class="user">
        <div class="user-img">
          <img :src="staticUrl + '/' + userInfo.aviltor" alt />
        </div>
        <div class="nickname info">
          <span>{{userInfo.nickname}}</span>
        </div>
        <div class="setting info">
          <span>设置</span>
        </div>
        <div class="out info">
          <span>退出</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="nav">
        <div class="accordion" id="accordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <div class="aside-item" data-toggle="collapse" data-target="#c1">类型管理</div>
            </div>

            <div
              id="c1"
              class="collapse show c-box"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div class="card-body">
                <div class="type-item">商品类型</div>
              </div>
              <div class="card-body">
                <div class="type-item">商品列表</div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header" id="headingTwo">
              <div class="aside-item" data-toggle="collapse" data-target="#c2">商品管理</div>
            </div>

            <div id="c2" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
              <div class="card-body">
                <div class="type-item">我的商品</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <!-- 二级路由 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Manage",
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    //获取用户信息
    getUserInfo() {
      this.axios({
        method: "GET",
        url: "/userInfo"
      })
        .then(result => {
          console.log("result ==> ", result);
          if (result.data.code == 1060) {
            this.userInfo = result.data.result[0];
          }
        })
        .catch(err => {
          console.log("err => ", err);
        });
    }
  },
  created() {
    console.log("this.staticUrl ==> ", this.staticUrl);
    this.getUserInfo();
  }
};
</script>

<style lang="less" scoped>
// html,
// body {
//   width: 100%;
//   height: 100%;
// }
.manage {
  height: 100vh;
  //头部
  .header {
    display: flex;
    justify-content: space-between;
    height: 10vh;
    padding: 0px 20px;
    background: linear-gradient(to right, #00aeff, blue);
    .title {
      display: flex;
      h2 {
        color: white;
        margin: auto;
        margin-right: 20px;
        font-weight: normal;
      }
    }
    .user {
      display: flex;
      .user-img {
        display: flex;
        margin: 0px 10px;
        img {
          margin: auto;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .info {
        margin: 0px 10px;
        display: flex;
        span {
          color: white;
          font-weight: 500;
          margin: auto;
        }
      }
      .setting,.out {
        span {
          cursor: pointer;
        }
      }
    }
  }
  .main {
    // height: 100%;
    height: 90vh;
    display: flex;
    .nav {
      width: 190px;
      background: linear-gradient(to bottom, #00aeff, blue);
      .accordion {
        width: 100%;

        .card {
          color: #fff;
          background: rgba(0, 0, 255, 0.2);
          .card-body {
            text-indent: 10px;
            padding: 12px 20px;
          }
        }
      }
      .card-header {
        background: rgba(0, 0, 255, 0.5);
        width: 100%;
        padding: 15px 20px;
      }
    }
    .content {
      background: linear-gradient(145deg, white, #aaaaaa);
      flex: 1;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>