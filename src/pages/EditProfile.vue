<template>
    <div class="flex flex-col justify-center items-center h-screen bg-dark-blue">
        <div class="absolute top-3 left-3 h-10 w-10">
            <RouterLink to="/Profile">
                <img src="../assets/icons/back_arrow_button.png" alt="Back Arrow Button" class="">
            </RouterLink>
        </div>

        <form id="edit-form"
            class="flex flex-col justify-center items-left w-4/5 md:w-1/2 gap-3 font-body text-white-snow">
            <div class="flex justify-between">
                <h2 class="text-3xl font-semibold">Edit profile</h2>

                <div class="flex justify-center">
                    <button type="submit" class="bg-light-blue text-dark-blue font-semibold p-1 rounded-xl px-8">
                        Save
                    </button>
                </div>
            </div>
            <div class=" bg-regular-blue rounded-2xl p-8 mt-4">
                <div class="flex flex-col gap-2">
                    <label for="display-name">Display name</label>
                    <input id="display-name" type="text" name="display-name" placeholder="your display name" 
                        class="rounded-xl bg-dark-blue p-2">
                </div>

                <div class="flex flex-col gap-2 mt-4">
                    <label for="email">Email</label>
                    <input id="email" type="email" name="email" placeholder="email@example.com" 
                        class="rounded-xl bg-dark-blue p-2">
                </div>

                <div class="flex flex-col gap-2 mt-4">
                    <label for="password">Password</label>
                    <input id="password" type="password" name="password" placeholder="your password" 
                        class="rounded-xl bg-dark-blue p-2">
                </div>

                <p id="register-error-message" class="hidden">
                    Invalid email or password, please try again.
                </p>

                <div class="flex flex-col gap-2 mt-4">
                    <label for="bio">Bio</label>
                    <textarea id="bio" name="bio" placeholder="your bio"
                        class="rounded-xl bg-dark-blue p-2 resize-none" />
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import router from '../router/index.js';
import { onMounted } from 'vue';

const auth = useAuthStore();

onMounted(() => {
    const editForm = document.querySelector('#edit-form');
    const registerErrorMessage = document.querySelector('#register-error-message');

    editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const displayName = document.querySelector('#display-name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value.trim();
        const bio = document.querySelector('#bio').value.trim();

        const bodyRequest = {};
        if (displayName) bodyRequest.display_name = displayName;
        if (email) bodyRequest.email = email;
        if (password) bodyRequest.password = password;
        if (bio) bodyRequest.bio = bio;

        fetch("http://localhost:8000/api/user", {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(bodyRequest),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                console.log(data);
                auth.setDisplayName(data.user?.display_name || '');
                router.push('/profile');
            })
            .catch(error => {
                console.log(error);
                registerErrorMessage.classList.remove('hidden');
                registerErrorMessage.classList.add('block');
            })
    });
});

</script>