import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
    }),

    getters: {
        isAuthenticated: (state) => state.token !== null,
    },

    actions: {
        setToken(token) {
            this.token = token
        },
        logout() {
            fetch("http://localhost:8080/api/logout", {
                method: 'Post',
                headers: { Authorization: `Bearer ${this.token}` },
            })
                .then(response => response.json())
                .then(data =>
                    this.setToken(null)
                )
                .catch(error => {
                    console.log(error)
                })
        }
    }
});