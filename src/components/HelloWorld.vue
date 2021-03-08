<template>
  <div class="hello">
    <h1>Vue项目通用模板</h1>
    <p>Vue版本：2.6.11</p>
    <p>UI框架：Iview 3.5.4</p>
    <router-link to="/iview-com-demo">二次封装iview框架</router-link>
  </div>
</template>

<script>
export default {
  name: "HelloWorld"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
