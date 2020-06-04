<template>
  <div class="Toast-box"></div>
</template>

<script>
import Vue from "vue";
Vue.prototype.$showToast = function(o) {
  for (let i = 0; i < this.$children.length; i++) {
    let childrens = this.$children[i].$el;
    console.log("childrens ==> ", childrens);
    if (childrens.className == "Toast-box") {
      childrens.textContent = o.message;
      childrens.style.top = "0px";
      setTimeout(() => {
        childrens.style.top = "-64px";
      }, o.duration || 2000);
      return;
    }
  }
};
export default {
  name: "Toast"
};
</script>

<style>
.Toast-box{
      width: 400px;
  height: 64px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: rgb(12, 61, 194);
  color: white;
  position: fixed;
  top: -64px;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  line-height: 64px;
  transition: top 0.2s linear;
  z-index: 9999;
}
</style>