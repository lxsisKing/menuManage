import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animated from 'animate.css'
import vuescroll from 'vuescroll';

Vue.use(vuescroll, {
  ops: {
    scrollPanel: {
      scrollingX: false,
    },
    bar: {
      showDelay: 1000,
      keepShow: false,
      background: '#c1c1c1',
    }
  }, // 在这里设置全局默认配置
  name: 'myScroll' // 在这里自定义组件名字，默认是vueScroll
});

Vue.use(ElementUI)
Vue.use(animated)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')