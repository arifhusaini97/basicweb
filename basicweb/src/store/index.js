import { createStore } from 'vuex';
import { UserModule } from "./User";

export default createStore({

    state: {},

    //function that directly effect the STATE.
    mutations: {},

    //function that you call throughout your application that call mutations. 
    actions: {},

    modules: { User: UserModule }
})