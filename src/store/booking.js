import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
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
})
