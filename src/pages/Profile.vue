<template>

    <div class="flex flex-col justify-center items-center min-h-screen bg-dark-blue pt-4 pb-4">
          <div class="absolute top-3 left-3 h-10 w-10">
            <RouterLink to="/home">
                <img src="../assets/icons/back_arrow_button.png" alt="Back Arrow Button" class="">
            </RouterLink>
        </div>
        <section class="ml-auto mr-4 text-white-snow absolute top-4 right-4">
            <div v-if="auth.token" class="flex justify-center items-center gap-2">
                <p>Hello {{ auth.displayName }}</p>
                <img src="../assets/icons/account_icon.png" alt="Profile Icon Light" class="w-10 h-10">
            </div>
        </section>
        <header class="flex flex-col justify-center items-center">
            <img src="../assets/logos/fermentation_jar_logo_light.png" alt="Brand Logo Light" class="w-30 h-30">
            <p class="text-gray">Cultivate community.</p>
        </header>
        <section class="pt-4 w-4/5 lg:w-1/2 text-white-snow">
            <div class="flex flex-col gap-8">
                <div>{{userInfos[0].user.displayName}}</div>
                <div>{{userInfos[0].user.username}}</div>
                <div>{{userInfos[0].user.bio}}</div>
            </div>
            <!-- </div> -->
        </section>

        <!-- <section class="pt-4 w-4/5 lg:w-1/2">
            <div class="flex flex-col gap-8">
                <PostItem v-for="post in usersPost" :username="post.username" :description="post.description"
                    :createdAt="post.created_at" />
            </div>
        </section> -->

    </div>

</template>

<script setup>

import PostItem from '../components/PostItem.vue';
import { useAuthStore } from '../stores/auth';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const auth = useAuthStore();
const userInfos = ref([]);
const usersPost = ref([]);


function getUserData() {
    fetch(`http://localhost:8000/api/users`, {
        method: 'GET',
        headers: {Authorization : `Bearer ${auth.token}`} 
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
        headers: {Authorization : `Bearer ${auth.token}`} 
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
    // loadUserPosts();
})


</script>