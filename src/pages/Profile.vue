<template>

    <div class="flex flex-col justify-center items-center min-h-screen bg-dark-blue pt-4 pb-4">
        <div class="absolute top-3 left-3 h-10 w-10">
            <RouterLink to="/home">
                <img src="../assets/icons/back_arrow_button.png" alt="Back Arrow Button" class="">
            </RouterLink>
        </div>
        <section class="ml-auto mr-4 text-white-snow absolute top-4 right-4">
            <div class="flex justify-center items-center gap-2">
                <p>Hello {{ auth.displayName }}</p>
                <img src="../assets/icons/account_icon.png" alt="Profile Icon Light" class="w-10 h-10">
            </div>
        </section>
        <section class="pt-4 w-4/5 lg:w-1/2 text-white-snow">
            <div class="flex flex-col gap-8" v-if="userInfos.user">
                <div class="flex justify-between  items-center w-full">
                    <div class="flex flex-col">
                        <div class="text-2xl">{{ userInfos.user.displayName }}</div>
                        <div class="text-gray">@{{ userInfos.user.username }}</div>
                    </div>
                    <div class="flex justify-center">
                        <button type="submit"
                            class="bg-light-blue text-dark-blue font-semibold p-1 rounded-xl px-15 flex justify-center">
                            Edit profile
                        </button>
                    </div>
                </div>
                <div class="pb-5">{{ userInfos.user.bio }}</div>
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
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const auth = useAuthStore();
const userInfos = ref({});
const usersPost = ref([]);


function getUserData() {
    fetch(`http://localhost:8000/api/users`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${auth.token}` }
    })
        .then(response => response.json())

        .then(data => {
            userInfos.value = data;
            console.log(data)

        })
        .catch(error => {
            console.log(error);
        });

}

function loadUserPosts() {
    fetch("http://localhost:8000/api/posts", {
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