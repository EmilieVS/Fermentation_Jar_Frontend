import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        displayName: null
    }),

    getters: {
        isAuthenticated: (state) => state.token !== null,
    },

    actions: {
        setToken(token) {
            this.token = token
        },
        setDisplayName(displayName) {
            this.displayName = displayName
        },
        logout() {
            fetch("http://localhost:8000/api/logout", {
                method: 'Post',
                headers: { Authorization: `Bearer ${this.token}` },
            })
                .then(response => response.json())
                .then(data =>
                    this.setToken(null),
                    this.setDisplayName(null)
                )
                .catch(error => {
                    console.log(error)
                })
        }
    }
});