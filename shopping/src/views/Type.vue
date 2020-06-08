<template>
  <div class="type">
    <!-- 搜索条件 -->
    <div class="clearfix">
      <div class="type-title">商品类型</div>
      <div class="search">
        <input
          type="text"
          class="form-control"
          placeholder="输入类型名称"
          v-model="typeTitle"
          @keyup.enter="search"
        />
      </div>
      <div class>
        <button class="btn btn-primary" @click="search">搜索</button>
      </div>
    </div>

    <div class="add">
      <button class="btn btn-warning" @click="showModal(1)">添加商品类型</button>
    </div>

    <!-- 商品类型列表 -->
    <div class="type-list">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>序号</th>
            <th>类型名称</th>
            <th>状态</th>
            <th>添加时间</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in typeData" :key="index">
            <td>{{index + 1}}</td>
            <td>{{item.type}}</td>
            <td>{{item.isEnable ? '正常' : '禁用'}}</td>
            <td>{{item.createdAt}}</td>
            <td>{{item.updatedAt}}</td>
            <td>
              <!-- <button class="btn btn-success btn-sm">查看</button> -->
              <button class="btn btn-info btn-sm edit" @click="showModal(2, index)">编辑</button>
              <button
                class="btn btn-danger btn-sm"
                v-if="item.isEnable"
                @click="toggleTypeStatus(0, item.typeId, index)"
              >禁用</button>
              <button
                class="btn btn-secondary btn-sm"
                v-else
                @click="toggleTypeStatus(1, item.typeId, index)"
              >启用</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <nav v-if="typeData.length > 0">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{disabled: currentPage == 1}" @click="togglePage()">
          <a class="page-link" href="javascript:void(0);">上一页</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="javascript:void(0);">{{currentPage}}</a>
        </li>
        <li
          class="page-item"
          :class="{disabled: currentPage == totalPage}"
          @click="togglePage(true)"
        >
          <a class="page-link" href="javascript:void(0);">下一页</a>
        </li>
        <li>
          <a class="page-link" href="javascript:void(0);">共 {{totalPage}} 页</a>
        </li>
      </ul>
    </nav>
    <!-- 添加商品类型 -->
    <div class="modal fade" id="modal" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group clearfix">
                <div class="fl type-name">类型名称</div>
                <div class="fl type-ipt">
                  <input type="text" class="form-control" placeholder="输入类型名称" v-model="type" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="saveType">保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入jquery
import $ from "jquery";

//导入公共方法文件
import { tool } from "../assets/js/tool.js";

export default {
  name: "Type",
  data() {
    return {
      //商品类型名称
      type: "",

      //编辑商品类型的id
      typeId: "",

      //商品类型数据
      typeData: [],

      //搜索类型
      typeTitle: "",

      //添加或者编辑商品类型标题
      title: "添加商品类型",

      //记录编辑的商品类型下标
      index: -1,

      //当前页数
      currentPage: 1,

      //每页显示10条数据
      pageCount: 10,

      //总页数
      totalPage: 1,

      //搜索标记
      isSearch: false
    };
  },
  methods: {
    // 保存商品类型
    saveType() {
      // 添加或编辑商品时空输入
      if (
        (typeof this.type === "string" && this.type.trim() == "") ||
        this.type == null
      ) {
        console.log("输入不能为空");
        return;
      }

      // 添加商品分支
      if (!this.typeId) {
        //发起添加类型数据请求
        this.axios({
          method: "POST",
          url: "/addType",
          data: {
            type: this.type
          }
        })
          .then(result => {
            console.log("result ==> ", result);

            if (result.data.code == 1040) {
              //获取商品类型
              this.getTypeData();

              //获取数据表的数据数量
              this.getTypeDataRows();

              $(this.$refs.modal).modal("hide");
            }

            this.type = "";
          })
          .catch(err => {
            console.log("err ==> ", err);
          });
      } else {
        //验证商品类型是否更改
        if (this.type == this.typeData[this.index].type) {
          $(this.$refs.modal).modal("hide");
          this.type = "";
          console.log("没有更改商品类型");
          return;
        }

        //编辑商品类型
        this.axios({
          method: "POST",
          url: "/type",
          data: {
            typeId: this.typeId,
            type: this.type
          }
        })
          .then(result => {
            // console.log('result ==> ', result);
            if (result.data.code == 1048) {
              $(this.$refs.modal).modal("hide");
            }

            // this.$showToast({
            //   message: result.data.msg
            // })

            this.typeData[this.index].type = this.type;
            this.typeData[this.index].updatedAt = tool.formatDate(
              new Date(),
              "yyyy-MM-dd hh:mm:ss"
            );
            this.type = "";
          })
          .catch(err => {
            console.log("err ==> ", err);
          });
      }
    },

    //获取商品类型数据
    getTypeData() {
      this.axios({
        method: "GET",
        url: "/getType",
        params: {
          //偏移数据量
          offset: (this.currentPage - 1) * this.pageCount,

          //查询数据量
          limit: this.pageCount
        }
      })
        .then(result => {
          console.log("result ==> ", result);

          result.data.result.forEach(v => {
            v.createdAt = tool.formatDate(
              new Date(v.createdAt),
              "yyyy-MM-dd hh:mm:ss"
            );

            v.updatedAt = tool.formatDate(
              new Date(v.updatedAt),
              "yyyy-MM-dd hh:mm:ss"
            );
          });

          this.typeData = result.data.result;
          this.isSearch = false;
          this.typeTitle = "";
        })
        .catch(err => {
          console.log("err => ", err);
        });
    },

    // 禁用和启动
    toggleTypeStatus(status, typeId, index) {
      this.axios({
        method: "POST",
        url: "/typeStatus",
        data: {
          status,
          typeId
        }
      })
        .then(result => {
          console.log("result ==> ", result);
          if (result.data.code == 1046) {
            this.typeData[index].isEnable = status;
          }
        })
        .catch(err => {
          console.log("err ==> ", err);
        });
    },

    //显示模态框
    showModal(flag, index) {
      if (flag == 2) {
        this.typeId = this.typeData[index].typeId;
        this.type = this.typeData[index].type;
        this.title = "编辑商品类型";
        this.index = index;
      } else {
        this.typeId = "";
        this.type = "";
        this.title = "添加商品类型";
        this.index = -1;
      }

      $(this.$refs.modal).modal("show");
    },

    //搜索商品类型数据
    search() {
      if (
        (typeof this.typeTitle === "string" && this.typeTitle.trim() == "") ||
        this.typeTitle == null
      ) {
        console.log("搜索关键字为空");
        return;
      }

      //搜索商品类型
      this.searchType();
    },

    //搜索商品类型
    searchType() {
      this.axios({
        method: "GET",
        url: "/searchType",
        params: {
          type: this.typeTitle,
          offset: (this.currentPage - 1) * this.pageCount,
          limit: this.pageCount
        }
      })
        .then(result => {
          console.log("result ==> ", result);
          result.data.result.forEach(v => {
            v.createdAt = tool.formatDate(
              new Date(v.createdAt),
              "yyyy-MM-dd hh:mm:ss"
            );

            v.updatedAt = tool.formatDate(
              new Date(v.updatedAt),
              "yyyy-MM-dd hh:mm:ss"
            );
          });
          this.typeData = result.data.result;

          this.isSearch = true;
        })
        .catch(err => {
          console.log("err ==> ", err);
        });
    },

    //获取数据表的数据数量, 用于分页
    getTypeDataRows() {
      this.axios({
        method: "GET",
        url: "/typeRows"
      })
        .then(result => {
          console.log("result.... ==> ", result);
          //分页
          this.totalPage = Math.ceil(result.data.result / this.pageCount);
        })
        .catch(err => {
          console.log("err ==> ", err);
        });
    },

    //点击上下页
    togglePage(isNext) {
      //下一页
      if (isNext) {
        if (this.currentPage < this.totalPage) {
          this.currentPage++;
          if (this.isSearch) {
            this.searchType();
          } else {
            this.getTypeData();
          }
        }
      } else {
        //上一页
        if (this.currentPage > 1) {
          this.currentPage--;
          if (this.isSearch) {
            this.searchType();
          } else {
            this.getTypeData();
          }
        }
      }
    }
  },
  created() {
    //获取商品类型数据
    this.getTypeData();

    //获取数据表的数据数量
    this.getTypeDataRows();
  }
};
</script>

<style lang="less" scoped>
.page-item {
  user-select: none;
}
.type-ipt {
  width: calc(~"100% - 80px");
}
.type-name {
  width: 80px;
  line-height: 38px;
}
.edit {
  margin: 0 10px;
}
.type-list {
  margin-top: 20px;
}
.add {
  margin-top: 40px;
}
.type-title {
  line-height: 38px;
}
// .type {
//   padding: 40px 30px 20px 30px;
// }
.search {
  width: 300px;
  margin: 0 20px;
}
.clearfix {
  display: flex;
}
</style>