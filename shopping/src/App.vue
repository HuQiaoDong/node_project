<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
body,
html {
  // margin: 0;
  // width: 100%;
  // height: 100%;
}
#app {
  // width: 100%;
  // height: 100%;
  width: 100vw;
  height: 100vh;
  min-width: 1170px;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.clearfix::after {
  display: block;
  content: "";
  clear: both;
}

.auto-img {
  width: 100%;
  display: block;
}
</style>
