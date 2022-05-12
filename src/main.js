import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css';


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faUserSecret, faBed, faLocationDot } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faUserSecret,faBed, faLocationDot)
/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(Toaster, {timeout: 8000})

router.beforeEach(async (to, from, next) => {
  if(to.meta.guest){
    next()
  }
  else{
    var isAuthenticated = localStorage.getItem('auth_token')?true:false;
    if (to.name !== 'auth.login' && !isAuthenticated) next({ name: 'auth.login' })
    if (to.name === 'auth.login' && isAuthenticated) next({ name: 'auth.dashboard' })
    else next()
  }
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
      // var user = await loginservice.me()
      // this.$store.commit('setloggedInUser',user);
      // if(user.permissions.length>0){
      //   let permissions = user.permissions.map((e)=>{
      //     return e.permission_id
      //   })
      //   this.$store.commit('setPermissions',permissions);
      // }
    }
  },
  render: h => h(App)
}).$mount('#app')
