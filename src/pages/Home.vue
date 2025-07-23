<template>
    <div class="flex flex-col justify-center items-center h-screen bg-dark-blue">
        <header class="flex flex-col justify-center items-center">
            <img src="../assets/logos/fermentation_jar_logo_light.png" alt="Brand Logo Light" class="w-40 h-40">
            <p class="text-gray">Cultivate community.</p>
        </header>
        <div class="absolute top-3 right-3 flex gap-2 text-white-snow">
            <RouterLink to="/login">Login</RouterLink>
            <p>|</p>
            <RouterLink to="/signup">Sign Up</RouterLink>
        </div>
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
import { ref, onMounted } from 'vue';

const postList = ref([]);

postList.value = [
    {
        id: 1,
        displayName: 'Lolo le zozo',
        username: '@nadrojria',
        description: 'Feeling like picking som cabbages today !',
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