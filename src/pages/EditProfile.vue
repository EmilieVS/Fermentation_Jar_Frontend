<template>
    <div class="flex flex-col justify-center items-center min-h-screen bg-dark-blue">
        <div class="absolute top-3 left-3 h-10 w-10">
            <RouterLink to="/profile">
                <img src="../assets/icons/back_arrow_button.png" alt="Back Arrow Button" class="">
            </RouterLink>
        </div>

        <form id="edit-form"
            class="flex flex-col justify-center items-left w-4/5 md:w-1/2 gap-3 font-body text-white-snow pt-8 pb-8">
            <div class="flex justify-between">
                <h2 class="text-3xl font-semibold">Edit profile</h2>

                <div class="flex justify-center">
                    <button @click="deleteAccount" type="button"
                        class="bg-red-900 text-white-snow font-semibold p-1 rounded-xl px-8 cursor-pointer">
                        Delete account
                    </button>
                </div>
            </div>
            <div class=" bg-regular-blue rounded-2xl p-8 mt-4">
                <div class="flex flex-col gap-2">
                    <label for="display-name">Display name</label>
                    <input v-model="displayName" type="text" name="display-name" placeholder="your display name"
                        class="rounded-xl bg-dark-blue p-2">
                </div>

                <div class="flex flex-col gap-2 mt-4">
                    <label for="email">Email</label>
                    <input v-model="email" type="email" name="email" placeholder="email@example.com"
                        class="rounded-xl bg-dark-blue p-2">
                </div>

                <div class="flex flex-col gap-2 mt-4">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" name="password" placeholder="your password"
                        class="rounded-xl bg-dark-blue p-2">
                </div>

                <div class="flex flex-col gap-2 mt-4">
                    <label for="bio">Bio</label>
                    <textarea v-model="bio" name="bio" placeholder="your bio"
                        class="rounded-xl bg-dark-blue p-2 h-20 resize-none"/>
                </div>

                <div>
                    <label for="profile_image">Profile Image</label>
                    <input type="file" name="profile_image" id="profile_image" enctype="multipart/form-data"
                        @change="handleImageChange">
                    <img v-if="imagePreview" :src="imagePreview" alt="Profile Image" width="200" />
                    <!-- <p v-else>No profile picture uploaded.</p> -->
                </div>

                <p id="edit-error-message" class="hidden">
                    {{ errorMessage }}
                </p>

                <div class="flex justify-center mt-6">
                    <button type="submit"
                        class="bg-light-blue text-dark-blue font-semibold p-1 rounded-xl px-8 cursor-pointer">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useUserStore } from '../stores/user';
import router from '../router/index.js';
import { ref, onMounted } from 'vue';

const auth = useAuthStore();
const user = useUserStore();
const displayName = ref('');
const email = ref('');
const password = ref('');
const bio = ref('');
const profileImage = ref(null)
const imagePreview = ref(null)

function handleImageChange(event) {
    const file = event.target.files[0];
    profileImage.value = file;

    if (file) {
        imagePreview.value = URL.createObjectURL(file);
    } else {
        imagePreview.value = null;
    }
}

onMounted(() => {
    const editForm = document.querySelector('#edit-form');
    const editErrorMessage = document.querySelector('#edit-error-message');

    displayName.value = user.user.displayName;
    email.value = user.user.email;
    bio.value = user.user.bio;

    if (user.user.profile_image) {
        imagePreview.value = `/storage/${user.user.profile_image}`;
    }

    editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (displayName.value) formData.append('display_name', displayName.value);
        if (email.value) formData.append('email', email.value);
        if (password.value) formData.append('password', password.value);
        if (bio.value) formData.append('bio', bio.value);
        if (profileImage.value) formData.append('profile_image', profileImage.value);

        fetch("http://localhost:8000/api/user", {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Accept': 'application/json',
                'Authorization': `Bearer ${auth.token}`

            },
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw errorData;
                    });
                }
                return response.json();
            })
            .then(data => {
                auth.setDisplayName(data.user?.display_name || '');
                router.push('/profile');
            })
            .catch(error => {
                console.log(error);
                errorMessage.value = error.message;
                editErrorMessage.classList.remove('hidden');
                editErrorMessage.classList.add('block');
            })
    });
});

function deleteAccount() {
    const editErrorMessage = document.querySelector('#edit-error-message');

    fetch(`http://localhost:8000/api/user`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${auth.token}`
        },
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            auth.setToken(null);
            auth.setDisplayName(null);
            router.push('/home');
        })
        .catch(error => {
            console.log(error);
            errorMessage.value = error.message;
            editErrorMessage.classList.remove('hidden');
            editErrorMessage.classList.add('block');
        })
}
</script>