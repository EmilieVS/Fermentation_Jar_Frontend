<template>
    <div class="flex flex-col justify-center items-center min-h-screen bg-dark-blue pt-4 pb-4">
        <div class="absolute top-3 left-3 h-10 w-10">
            <RouterLink to="/home">
                <img src="../assets/icons/back_arrow_button.png" alt="Back Arrow Button" class="">
            </RouterLink>
        </div>
        <section class="pt-4 w-4/5 lg:w-1/2 text-white-snow">
            <div class="flex flex-col gap-8" v-if="userInfos.user">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-4 sm:gap-0">
                    <div class="flex flex-col flex-grow min-w-0">
                        <div class="text-xl sm:text-2xl lg:text-3xl break-words">{{ userInfos.user.display_name }}</div>
                        <div class="text-gray break-words text-sm sm:text-base">@{{ userInfos.user.username }}</div>
                    </div>
                    <div class="flex justify-start sm:justify-end flex-shrink-0">
                        <RouterLink to="/profile/edit"
                            class="bg-light-blue text-dark-blue font-semibold p-1 sm:p-2 rounded-xl px-4 sm:px-6 lg:px-8 flex justify-center cursor-pointer text-sm sm:text-base whitespace-nowrap">
                            Edit profile
                        </RouterLink>
                    </div>
                </div>
                <div class="pb-5 text-sm sm:text-base">{{ userInfos.user.bio }}</div>
            </div>
            <hr class="border-gray">
        </section>
        <section class="pt-4 w-4/5 lg:w-1/2">
            <div class="flex flex-col gap-8">
                <PostItem v-for="post in usersPost" :username="post.username" :description="post.description"
                    :createdAt="post.created_at" />
            </div>
        </section>
    </div>
</template>

<script setup>
import PostItem from '../components/PostItem.vue';
import { useAuthStore } from '../stores/auth';
import { useUserStore } from '../stores/user';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const auth = useAuthStore();
const user = useUserStore();
const userInfos = ref({});
const usersPost = ref([]);

function getUserData() {
    fetch(`http://localhost:8000/api/user`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${auth.token}` }
    })
        .then(response => response.json())
        .then(data => {
            userInfos.value = data;
            user.setUser(data.user);
        })
        .catch(error => {
            console.log(error);
        });
}

function loadUserPosts() {
    fetch("http://localhost:8000/api/user/post", {
        method: 'GET',
        headers: { Authorization: `Bearer ${auth.token}` }
    })
        .then(response => response.json())
        .then(data => {
            usersPost.value = data;
        })
        .catch(error => {
            console.log(error);
        });
}

onMounted(() => {
    getUserData();
    loadUserPosts();
})
</script>