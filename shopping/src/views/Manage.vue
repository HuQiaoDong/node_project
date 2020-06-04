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
          <div class="card" v-for="(item, index) in asideMenu" :key="index">
            <div class="card-header">
              <div class="aside-item" data-toggle="collapse" :data-target="'#c' + index">
                <div class="fl fa-box">
                  <i class="fa" :class="[item.icon]"></i>
                </div>
                <div class="fl fa-title">
                  <span class="fl">{{item.title}}</span>
                  <i class="fa fa-angle-down fr down-arrow"></i>
                </div>
              </div>
            </div>

            <div
              :id="'c' + index"
              class="collapse c-box"
              :class="{show: index == 0}"
              data-parent="#accordion"
            >
              <div class="card-body">
                <div
                  class="type-item"
                  :class="{active: v.isActive}"
                  v-for="(v, i) in item.subTitle"
                  :key="i"
                  @click="toggleAsideMenu(v)"
                >{{v.name}}</div>
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
      // 用户信息
      userInfo: {},

      // 导航模型
      asideMenu: [
        {
          title: "商品管理",
          // icon: 'fa-cube',
          subTitle: [
            {
              name: "商品类型",
              isActive: true,

              //路由名称
              routerName: "Type"
            },
            {
              name: "商品列表",
              isActive: false,
              routerName: "Goods"
            }
          ]
        },
        {
          title: "订单管理",
          // icon: 'fa-file-text-o',
          subTitle: [
            {
              name: "订单列表",
              isActive: false,
              routerName: ""
            }
          ]
        },
        {
          title: "数据统计",
          // icon: 'fa-bar-chart',
          subTitle: [
            {
              name: "商品统计",
              isActive: false,
              routerName: ""
            },
            {
              name: "订单统计",
              isActive: false,
              routerName: ""
            }
          ]
        }
      ]
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
    },
    //切换侧边栏菜单
    toggleAsideMenu(item) {
      //如果当前选中，不做任何事情
      if (item.isActive) {
        console.log("已经选中");
        return;
      }
      console.log("item ==> ", item);

      //将其他选中修改为未选中状态
      this.asideMenu.forEach(v1 => {
        v1.subTitle.forEach(v2 => {
          v2.isActive = false;
        });
      });

      item.isActive = true;

      this.$router.push({ name: item.routerName });
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
      .setting,
      .out {
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
      width: 220px;
      background: linear-gradient(to bottom, #00aeff, blue);
      .accordion {
        width: 100%;

        .card {
          color: #fff;
          background: rgba(0, 0, 255, 0.2);
          .card-body {
            text-indent: 10px;
            padding: 0px 0px;
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
      background: linear-gradient(145deg, white, #cccccc);
      flex: 1;
      height: 100%;
      padding: 40px 30px 20px 30px;
      overflow-y: auto;
    }
    .type-item {
      height: 40px;
      line-height: 40px;
      color: #fff;
      padding-left: 20px;
      cursor: pointer;
      &:hover {
        background-color: #0f62c1;
      }
      &.active{
         background-color: #0F62c1;
         opacity: 0.8;
      }
    }
  }
}
</style>