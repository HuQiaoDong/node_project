<template>
  <div class="manage">
    <div class="header">
      <div class="title">
        <h1>商家后台</h1>
      </div>

      <div class="user">
        <div class="user-img"></div>
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
    return {};
  }
};
</script>

<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
}
.manage {
  height: 100%;
  //头部
  .header {
    display: flex;
    justify-content: space-between;
    height: 10%;
    background: #dddddd;
    .title {
      display: flex;
      h1 {
        margin: auto;
        font-weight: normal;
      }
    }
    .user {
      display: flex;
      .user-img {
        margin: auto;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: black;
      }
    }
  }
  .main {
    height: 90%;
    display: flex;
    .nav {
      flex: 1;
      background: linear-gradient(skyblue, blue);
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
      flex: 9;
    }
  }
}
</style>