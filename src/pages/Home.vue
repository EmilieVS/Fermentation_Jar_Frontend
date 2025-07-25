<template>
    <div class="flex flex-col justify-center items-center min-h-screen bg-dark-blue pt-4 pb-4">
        <section class="ml-auto mr-4 text-white-snow ">
            <div v-if="auth.token" class="flex justify-center items-center gap-2">
                <p>Hello {{ auth.displayName }}</p>
                <RouterLink to="/profile"><img src="../assets/icons/account_icon.png" alt="Profile Icon Light" class="w-10 h-10">
                </RouterLink>
            </div>
            <div v-else class="flex justify-center items-center gap-2">
                <RouterLink to="/login">Login</RouterLink>
                <p>|</p>
                <RouterLink to="/signup">Sign Up</RouterLink>
            </div>
        </section>
        <header class="flex flex-col justify-center items-center">
            <img src="../assets/logos/fermentation_jar_logo_light.png" alt="Brand Logo Light" class="w-30 h-30">
            <p class="text-gray">Cultivate community.</p>
        </header>
        <section class="pt-4 w-4/5 lg:w-1/2">
            <div class="flex flex-col gap-8">
                <PostItem v-for="post in postList" :id="post.id" :displayName="post.displayName"
                    :username="post.username" :description="post.description" :createdAt="post.created_at" />
            </div>
        </section>
    </div>
</template>

<script setup>
import PostItem from '../components/PostItem.vue';
import { useAuthStore } from '../stores/auth';
import { ref, onMounted } from 'vue';

const auth = useAuthStore();
const postList = ref([]);

function loadAllPosts() {
    fetch("http://localhost:8000/api/posts/all", {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            postList.value = data;
        })
        .catch(error => {
            console.log(error);
        });
}

onMounted(() => {
    loadAllPosts();
})
</script>