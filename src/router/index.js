import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Announcements from '@/components/announcements'
import Dryteachinginformation from '@/components/dryteachinginformation'
import Dynamicwork from '@/components/dynamicwork'
import Home from '@/pages/home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Home',
      name: 'home',
      component: Home,
    },
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/Announcements',
        name: 'announcements',
        component: Announcements
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: '/Dynamicwork',
        name: 'dynamicwork',
        component: Dynamicwork
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: '/Dryteachinginformation',
        name: 'dryteachinginformation',
        component: Dryteachinginformation
      },
     
    
    {
      path: '/',
      redirect:'/Login'
    }
  ]
})
