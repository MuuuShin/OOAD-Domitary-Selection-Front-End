import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'HomeView',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'LoginView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LoginView
  },
  {
    path: '/',
    redirect:'/login'
  },{
    path: '/user/:id',
    name: 'UserView',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue')
  },{
    path: '/team/search',
    name: 'TeamSearchView',
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamSearchView.vue')
  },{
    path: '/team/:id',
    name: 'TeamView',
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamView.vue')
  },{
    path: '/room/search',
    name: 'RoomSearchView',
    component: () => import(/* webpackChunkName: "about" */ '../views/RoomSearchView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
