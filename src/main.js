import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Toaster from 'v-toaster';
import loginservice from '@/services/login';
// import 'v-toaster/dist/v-toaster.css';
// document.title = 'Admin | NCS-Rail';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faUserSecret, faBed, faLocationDot } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */

import { VueMaskDirective } from 'v-mask'

Vue.directive('mask', VueMaskDirective);
library.add(faUserSecret,faBed, faLocationDot)
/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(Toaster, {timeout: 8000})

router.beforeEach(async (to, from, next) => {
  if(to.meta.guest){
    next()
  }
  else {
       Vue.nextTick(() => {
        document.title = to.meta.title + ' | NCS-Rail' ;
    });
    var isAuthenticated = localStorage.getItem('auth_token')?true:false;
    if (to.name !== 'auth.login' && !isAuthenticated) next({ name: 'auth.login' })
    if (to.name === 'auth.login' && isAuthenticated) next({ name: 'auth.dashboard' })
    else next()
  }
})
Vue.mixin({
  methods: {
    hasPermission: function (id) {
    let Permission = this.$store.getters.getPermissions;
     return Permission.includes(id);
    },
  },
})

new Vue({
  router,
  store,
  vuetify,
    async created(){
    var token = localStorage.getItem('auth_token')?localStorage.getItem('auth_token'):'';
    if(token){
      this.$store.commit('setAuthToken',token);
      this.$store.commit('setLoginStatus',true);
      var res = await loginservice.me();
      this.$store.commit('setloggedInUser', res.user);
      if (res.permissions.length > 0) { 
      this.$store.commit('SetPermissionIDs',res.permissions);
      }
      // if(user.permissions.length>0){
      // let permissions_ids = res.map((e)=>{
      //     return e.permissionId
      //   })
      //   this.$store.commit('setPermissions',permissions);
      // }
    } else {
      this.$router.push({ name: "auth.login" });
    }
  },
  render: h => h(App)
}).$mount('#app')
