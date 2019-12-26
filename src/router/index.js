import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Admin from '@/components/Login/Admin'

import WorkIndex from '@/components/Workbench/WorkIndex'
import WorkManage from '@/components/Workbench/WorkManage'
import GatewayInto from '@/components/Workbench/GatewayInto'
import VideoPlayback from '@/components/Workbench/VideoPlayback'
import Videolive from '@/components/Workbench/Videolive'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/WorkIndex',
      name: 'WorkIndex',
      component: WorkIndex
    },
    {
      path: '/WorkManage',
      name: 'WorkManage',
      component: WorkManage
    },
    {
      path: '/GatewayInto',
      name: 'GatewayInto',
      component: GatewayInto
    },
    {
      path: '/VideoPlayback',
      name: 'VideoPlayback',
      component: VideoPlayback
    },
    {
      path: '/Videolive',
      name: 'Videolive',
      component: Videolive
    }
  ],
  linkActiveClass: 'show'
})
