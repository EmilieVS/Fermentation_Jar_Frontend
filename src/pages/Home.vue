<template>
    <div class="flex flex-col justify-center items-center h-screen bg-dark-blue">
        <header class="flex flex-col justify-center items-center">
            <img src="../assets/logos/fermentation_jar_logo_light.png" alt="Brand Logo Light" class="w-40 h-40">
            <p class="text-gray">Cultivate community.</p>
        </header>
        <section class="absolute top-3 right-3 text-white-snow">
            <div v-if="auth.token" class="flex justify-center items-center gap-2">
                <p>Hello {{ auth.displayName }}</p>
                <img src="../assets/icons/account_icon.png" alt="Profile Icon Light" class="w-10 h-10">
            </div>
            <div v-else class="flex justify-center items-center gap-2">
                <RouterLink to="/login">Login</RouterLink>
                <p>|</p>
                <RouterLink to="/signup">Sign Up</RouterLink>
            </div>
        </section>
        <section class="m-4 w-4/5 lg:w-1/2">
            <div class="flex flex-col gap-12">
                <PostItem v-for="post in postList" :id="post.id" :displayName="post.displayName"
                    :username="post.username" :description="post.description" :createdAt="post.createdAt" />
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

postList.value = [
    {
        id: 1,
        displayName: 'Lolo le zozo',
        username: '@nadrojria',
        description: 'Feeling like picking some cabbages today !',
        createdAt: '15/07/2025',
    },
    {
        id: 2,
        displayName: 'Houmous man',
        username: '@hazbraaaa',
        description: 'Made awesome cucumber kimchi yesterday.',
        createdAt: '18/07/2025',
    },
]

function loadAllPosts() {
    fetch("http://localhost:8000/api/posts", {
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