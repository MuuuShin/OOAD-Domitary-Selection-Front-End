import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'HomeView',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/Login',
    name: 'LoginView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LoginView
  },
  {
    path: '/',
    redirect:'/Login'
  },{
    path: '/user/:id',
    name: 'UserView',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue')
  },{
    path: '/team/search',
    name: 'UserView',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
