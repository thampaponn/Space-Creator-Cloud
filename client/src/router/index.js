import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/Signin.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/',
      name: 'mainpage',
      component: () => import('../views/Mainpage.vue')
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: () => import('../views/ForPassword.vue')
    },
    {
      path: '/history/:studentId',
      name: 'history',
      component: () => import('../views/History.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/Detail.vue')
    },
    {
      path: '/reserve/:id',
      name: 'reserve',
      component: () => import('../views/Reserve.vue')
    },
    {
      path: '/reserverequest',
      name: 'reserverequest',
      component: () => import('../views/ReserveRequest.vue')
    },
    {
      path: '/reportrequest',
      name: 'reportrequest',
      component: () => import('../views/ReportRequest.vue')
    },
    {
      path: '/report/:roomId',
      name: 'report',
      component: () => import('../views/Report.vue')
    },
    {
      path: '/reporthistory/:studentId',
      name: 'reporthistory',
      component: () => import('../views/ReportHistory.vue')
    },
    {
      path: '/manageroom',
      name: 'manageroom',
      component: () => import('../views/ManageRoom.vue')
    },
    {
      path: '/reservetable',
      name: 'reservetable',
      component: () => import('../views/ReserveTable.vue')
    },
    {
      path: '/addroom',
      name: 'addroom',
      component: () => import('../views/AddRoom.vue')
    },
    {
      path: '/editroom/:id',
      name: 'editroom',
      component: () => import('../views/EditRoom.vue')
    },
  ]
})

export default router
