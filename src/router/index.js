import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'hello',
      path: '/',
      component: () => import('../components/HelloWorld'),
      meta: {}
    },
    {
      name: 'iviewComDemo',
      path: '/iview-com-demo',
      component: () => import('../components/iview/ComDemo'),
      meta: {}
    }
  ]
})

// 路由拦截
router.beforeEach((to, from, next) => {
  console.log('路由拦截', to, from)
  next()
})

export default router