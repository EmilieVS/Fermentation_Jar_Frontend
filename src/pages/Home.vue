<template>
    <div class="flex flex-col justify-center items-center min-h-screen bg-dark-blue pt-4 pb-4 ">
        <section class="ml-auto mr-4 text-white-snow">
            <div v-if="auth.token" class="flex justify-center items-center gap-2">
                <p>Hello {{ auth.displayName }}</p>
                <button @click="toggleProfileModal">
                    <img src="../assets/icons/account_icon.png" alt="Profile Icon Light"
                        class="w-10 h-10 cursor-pointer">
                </button>
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

        <section v-if="auth.token" class="pt-4 w-4/5 lg:w-1/2 mb-4">
            <button @click="openPostModal"
                class="w-full bg-transparent border border-gray rounded-xl px-6 py-4 text-left text-gray hover:bg-regular-blue cursor-pointer transition-colors duration-200">
                What's on your mind?
            </button>
        </section>

        <section class="w-4/5 lg:w-1/2">
            <div class="flex flex-col gap-8">
                <PostItem v-for="post in postList" :id="post.id" :displayName="post.displayName"
                    :username="post.username" :description="post.description" :createdAt="post.created_at" />
            </div>
        </section>

        <div v-if="showPostModal" class="fixed inset-0 bg-dark-blue flex items-center justify-center z-50 px-4"
            @click="closePostModal">
            <div class="bg-regular-blue rounded-2xl w-full max-w-md mx-auto border border-gray-600" @click.stop>
                <div class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-600">
                    <h2 class="text-white-snow text-lg sm:text-xl font-semibold">New post</h2>
                    <button @click="closePostModal"
                        class="text-gray hover:text-white-snow transition-colors duration-200 cursor-pointer">
                        <img src="../assets/icons/close_button.png" alt="Close window button" class="w-8 h-8">
                    </button>
                </div>
                <div class="p-4 sm:p-6">
                    <div class="relative mb-4 sm:mb-6">
                        <textarea id="post-content" placeholder="What's on your mind?"
                            class="w-full bg-dark-blue border border-gray-600 rounded-xl px-3 sm:px-4 py-3 text-white-snow placeholder-gray resize-none focus:outline-none focus:ring-1 focus:ring-white-snow focus:border-transparent text-sm sm:text-base"
                            rows="4"></textarea>
                    </div>
                    <button @click="createPost"
                        class="w-full bg-light-blue text-dark-blue font-semibold py-3 rounded-xl cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base">
                        Post
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showProfileModal" class="fixed top-16 sm:top-20 right-2 sm:right-4 z-50">
            <div class="bg-regular-blue rounded-xl border border-gray-600 shadow-lg min-w-40 sm:min-w-48">
                <RouterLink to="/profile"
                    class="w-full px-4 sm:px-6 py-2 sm:py-3 text-center text-white-snow hover:bg-dark-blue transition-colors duration-200 rounded-t-xl border-b cursor-pointer border-gray-600 text-sm sm:text-base">
                    My profile
                </RouterLink>
                <button @click="logout"
                    class="w-full px-4 sm:px-6 py-2 sm:py-3 text-center text-white-snow cursor-pointer hover:bg-dark-blue transition-colors duration-200 rounded-b-xl text-sm sm:text-base">
                    Log out
                </button>
            </div>
        </div>

        <div v-if="showProfileModal" class="fixed inset-0 z-40" @click="closeProfileModal"></div>

    </div>
</template>

<script setup>
import PostItem from '../components/PostItem.vue';
import { useAuthStore } from '../stores/auth';
import { ref, onMounted } from 'vue';

const auth = useAuthStore();
const postList = ref([]);
const showPostModal = ref(false);
const postContent = ref('');
const showProfileModal = ref(false);

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

function toggleProfileModal() {
    showProfileModal.value = !showProfileModal.value;
}

function closeProfileModal() {
    showProfileModal.value = false;
}

function logout() {
    closeProfileModal();
    auth.logout();
}

function openPostModal() {
    showPostModal.value = true;
}

function closePostModal() {
    showPostModal.value = false;
    postContent.value = '';
}

function createPost() {

    const postContent = document.querySelector('#post-content').value

    // if (!postContent.trim() || postContent.trim().length < 50) {
    //     return;
    // }


    fetch("http://localhost:8000/api/posts", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ description: postContent })
    })
        .then(response => response.json())
        .then(data => {
            loadAllPosts();
            closePostModal();
        })
        .catch(error => {
            console.log(error);
        });
}

onMounted(() => {
    loadAllPosts();
});
</script>