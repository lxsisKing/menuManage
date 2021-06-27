import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Home from '@/views/Home/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title: '天辉餐厅菜单管理系统'
    }
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
    
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  let token = store.state.authorization.token
  if (to.path === '/login') {
    if (token === null) {
      next()
    } else {
      next({
        name: 'Home'
      })
    }
  } else {
    if (token === null) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  }
})


export default router