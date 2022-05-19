import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
// export default new Vuex.Store({
//     state: {
//          authtoken: '',
//         loggedIn: false,
//         loggedInUser: {},
//         permissions: [],
//         sideBarStatus: false,
//         notificationStatus: false,
//         notificationText: '',
//     },
//     mutations: {
//         setAuthToken(state, authtoken) {
//             localStorage.setItem('auth_token',authtoken);
//             axios.defaults.headers.common['Authorization'] = 'Bearer ' + authtoken;
//             //  axios.defaults.headers.common['Authorization'] = authtoken;
//             state.authtoken = authtoken
//         },
//         setLoginStatus(state, loggedIn) {
//             state.loggedIn = loggedIn
//         },
//         setloggedInUser(state, loggedInUser){
//             localStorage.setItem('logged_in_role_id',loggedInUser.role_id);
//             state.loggedInUser = loggedInUser
//         },
//           setPermissions(state, permissions){
//             state.permissions = permissions
//         },
//         setSideBarStatus(status, sideBarStatus){
//             status.sideBarStatus = sideBarStatus
//         },
//         setNotification(state, text){
//             state.notificationText = text
//             state.notificationStatus = true
//             setTimeout(()=>{
//                 state.notificationStatus = false
//             },1000)
//         }
//     },
//     getters: {
//         authtoken(state) {
//             return state.authtoken
//         },
//         loggedIn(state) {
//             return state.loggedIn
//         },
//         loggedInUser(state){
//             return state.loggedInUser
//         },
//         getPermissions(state){
//             return state.permissions
//         },
//         sideBarStatus(state){
//             return state.sideBarStatus
//         },
//         notificationStatus(state){
//             return state.notificationStatus
//         },
//         notificationText(state){
//             return state.notificationText
//         }
//     }
// })

const booking = {
        state: {
        searched_request: 'sdfsdf',
        searched_train: '',
        selectedClass: '',
    },
    mutations: {
         setSearchedRequest(state, searched_request){
            state.searched_request = searched_request
        },
        setsearched_train(state, searched_train) {
            state.searched_train = searched_train
        },
        setselectedClass(state, selectedClass){
            state.selectedClass = selectedClass
        },
       
    },
    getters: {
        GetSearchedRequest(state) {
            return state.searched_request
        },
        GetSearchedTrain(state) {
            return state.searched_train
        },
        GetSelectedClass(state) {
            return state.selectedClass
        },
      
    }
}
const auth = {
      state: {
         authtoken: '',
        loggedIn: false,
        loggedInUser: {},
        permissions: [],
        sideBarStatus: false,
        notificationStatus: false,
        notificationText: '',
    },
    mutations: {
        setAuthToken(state, authtoken) {
            localStorage.setItem('auth_token',authtoken);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + authtoken;
            //  axios.defaults.headers.common['Authorization'] = authtoken;
            state.authtoken = authtoken
        },
        setLoginStatus(state, loggedIn) {
            state.loggedIn = loggedIn
        },
        setloggedInUser(state, loggedInUser){
            localStorage.setItem('logged_in_role_id',loggedInUser.role_id);
            state.loggedInUser = loggedInUser
        },
          setPermissions(state, permissions){
            state.permissions = permissions
        },
        setSideBarStatus(status, sideBarStatus){
            status.sideBarStatus = sideBarStatus
        },
        setNotification(state, text){
            state.notificationText = text
            state.notificationStatus = true
            setTimeout(()=>{
                state.notificationStatus = false
            },1000)
        }
    },
    getters: {
        authtoken(state) {
            return state.authtoken
        },
        loggedIn(state) {
            return state.loggedIn
        },
        loggedInUser(state){
            return state.loggedInUser
        },
        getPermissions(state){
            return state.permissions
        },
        sideBarStatus(state){
            return state.sideBarStatus
        },
        notificationStatus(state){
            return state.notificationStatus
        },
        notificationText(state){
            return state.notificationText
        }
    }
}

export default new Vuex.Store({
  modules: {
    auth: auth,
    booking: booking
  }
})