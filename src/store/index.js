import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        logout(state) {
            state.user = null;
        }
    },
    getters: {
        _isAuthenticated: state => state.user !== null,
        _getCurrentUser: (state) => {
            return state.user;
        },
    },
    plugins: [createPersistedState()],
});
