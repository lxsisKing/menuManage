<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
* {
  box-sizing: border-box;
}

html {
  height: 100%;
  width: 100%;
  
}

body {
  height: 100%;
  width: 100%;
  margin: 0;
  
}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

.el-message.message-class {
  min-width: 180px;
}
</style>
