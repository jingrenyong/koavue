import Vue from 'vue'
import Router from 'vue-router'
import shoppingMall from '@/components/shoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/login'
import Goods from '@/components/pages/Goods'
import CategoryList  from '@/components/pages/CategoryList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shoppingMall',
      component: shoppingMall
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/CategoryList',
      name: 'CategoryList',
      component: CategoryList
    }
  ]
})
