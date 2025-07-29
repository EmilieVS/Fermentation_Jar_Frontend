import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            displayName: null,
            email: null,
            bio: null
        }
    }),

    actions: {
        setUser(user) {
            this.user.displayName = user.display_name;
            this.user.email = user.email;
            this.user.bio = user.bio;
        },
    }
});