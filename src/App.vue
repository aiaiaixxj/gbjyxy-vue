<template>
  <keep-alive>
    <router-view></router-view>
</keep-alive>
</template>
<script>
import login from './components/login.vue'
export default {
  name: 'App',
components: {
    login
},
    data() {
      return {
        msg:''
      }
    },
    methods:{
     
    }
}
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
 
}

</style>
