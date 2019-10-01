
 
<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view />
  </div>
</template>

<script>
// import  Home  from "@/views/Home.vue";
// import Product from "@/views/Product.vue";

export default {
  data() {
    return {
      info: null
    };
  },
  components: {
    // Home,
    // Product,
  },
  mounted() {
   this.$store.dispatch("getData");
  }
};
</script>

<style>
body  {
 margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  height: 100%;
 
}
</style>
