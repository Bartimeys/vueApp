import Vue from 'vue'
import Router from 'vue-router'
import Basic from '@/components/Basic'
import TablePager from '@/components/TablePager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Basic',
      component: Basic
    },
    {
      path: '/search',
      name: 'TablePager',
      component: TablePager
    }
  ]
})
