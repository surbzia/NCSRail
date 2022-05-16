import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import Addcity from '../views/Addcity.vue'
// import Addstation from '../views/Addstation.vue'
// import Addtrain from '../views/Addtrain.vue'
// import Traincoaches from '../views/Traincoaches.vue'
// import AuthLogin from '../views/Auth/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'auth.login',
    component: ()=> import('@/views/Auth/Login.vue'),
    meta: { showsidebar: true ,title: 'Login'}
  },

  {
    path: '/dashboard',
    name: 'auth.dashboard',
    component: ()=> import('@/views/dashboard/dashboard.vue'),
    meta: {
      showsidebar: false,
      title: 'Dashboard'
    }
  },
  // {
  //   path: '/addcity',
  //   name: 'auth.addcity',
  //   component: Addcity,
  //   meta: { showsidebar: false }
  // },
  // {
  //   path: '/addtrain',
  //   name: 'auth.addtrain',
  //   component: Addtrain,
  //   meta: { showsidebar: false }
  // },
  // {
  //   path: '/addroutes',
  //   name: 'auth.addroutes',
  //   component: Addroutes,
  //   meta: { showsidebar: false }
  // },
  // {
  //   path: '/addstation',
  //   name: 'auth.addstation',
  //   component: Addstation,
  //   meta: { showsidebar: false }
  // },
  // {
  //   path: '/traincoaches',
  //   name: 'auth.traincoaches',
  //   component: Traincoaches,
  //   meta: { showsidebar: false }
  // },


  {
    path: '/stations',
    name: 'auth.stations.listing',
    component: ()=> import('@/views/stations/list.vue'),
    meta: { showsidebar: false, title: 'Stations' }
  },
  {
    path: '/cities',
    name: 'auth.cities.listing',
    component: ()=> import('@/views/cities/list.vue'),
    meta: { showsidebar: false, title: 'Cities' }
  },
  {
    path: '/trains',
    name: 'auth.trains.listing',
    component: ()=> import('@/views/trains/list.vue'),
    meta: { showsidebar: false, title: 'Trains' }
  },
  {
    path: '/trains/route',
    name: 'auth.routes.listing',
    component: ()=> import('@/views/trainRoutes/list.vue'),
    meta: { showsidebar: false, title: 'Train Routes' }
  },
  {
    path: '/trains/route/add',
    name: 'auth.routes.add',
    component: ()=> import('@/views/trainRoutes/form.vue'),
    meta: { showsidebar: false, title: 'Train Routes Add' }
  },
  {
    path: '/bookings',
    name: 'auth.bookings.listing',
    component: ()=> import('@/views/bookings/list.vue'),
    meta: { showsidebar: false, title: 'Bookings' }
  },
  {
    path: '/bookings/detail/:id',
    name: 'auth.bookings.detail',
    component: ()=> import('@/views/bookings/detail.vue'),
    meta: { showsidebar: false , title: 'booking Details'}
  },
  {
    path: '/trainCoaches',
    name: 'auth.coaches.listing',
    component: ()=> import('@/views/trainCoaches/list.vue'),
    meta: { showsidebar: false, title: 'Train Coaches' }
  },
  {
    path: '/trainCoaches/add',
    name: 'auth.coaches.add',
    component: ()=> import('@/views/trainCoaches/form.vue'),
    meta: { showsidebar: false,  title: 'Train Coaches Add' }
  },
  {
    path: '/trainCoaches/edit/:id',
    name: 'auth.coaches.edit',
    component: ()=> import('@/views/trainCoaches/form.vue'),
    meta: { showsidebar: false , title: 'Train Coaches Edit'}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
