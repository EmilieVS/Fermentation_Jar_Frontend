<template>
    <div class="flex flex-col justify-center items-center h-screen bg-dark-blue">
        <div class="absolute top-3 left-3 h-10 w-10">
            <RouterLink to="/home">
                <img src="../assets/icons/back_arrow_button.png" alt="Back Arrow Button" class="">
            </RouterLink>
        </div>

        <form id="register-form"
            class="flex flex-col justify-center items-left w-4/5 md:w-1/2 gap-3 font-body bg-regular-blue text-white-snow p-8 rounded-2xl">

            <h2 class="text-3xl font-semibold">Sign Up</h2>

            <div class="flex flex-col gap-1">
                <label for="display-name">Display name*</label>
                <input id="display-name" type="text" name="display-name" placeholder="your display name" required
                    class="rounded-xl bg-dark-blue p-2">
            </div>

            <div class="flex flex-col gap-1">
                <label for="username">Username*</label>
                <input id="username" type="text" name="username" placeholder="your username" required
                    class="rounded-xl bg-dark-blue p-2">
            </div>

            <div class="flex flex-col gap-1">
                <label for="email">Email*</label>
                <input id="email" type="email" name="email" placeholder="email@example.com" required
                    class="rounded-xl bg-dark-blue p-2">
            </div>

            <div class="flex flex-col gap-1">
                <label for="password">Password*</label>
                <input id="password" type="password" name="password" placeholder="your password" required
                    class="rounded-xl bg-dark-blue p-2">
            </div>

            <p id="register-error-message" class="hidden">
                {{ errorMessage }}
            </p>

            <div class="flex items-center justify-center mt-6">
                <button type="submit"
                    class="w-1/2 bg-light-blue text-dark-blue font-semibold p-1 rounded-xl cursor-pointer">
                    Continue
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import router from '../router/index.js';
import { onMounted, ref } from 'vue';

const auth = useAuthStore();
const errorMessage = ref('');

onMounted(() => {
    const registerForm = document.querySelector('#register-form');
    const registerErrorMessage = document.querySelector('#register-error-message');

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const displayName = document.querySelector('#display-name').value;
        const username = document.querySelector('#username').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        fetch("http://localhost:8000/api/user", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json' 
            },
            body: JSON.stringify({ display_name: displayName, username: username, email: email, password: password }),
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
                auth.setToken(data.access_token);
                auth.setDisplayName(data.user.display_name);
                router.push('/home');
            })
            .catch(error => {
                console.log(error);
                errorMessage.value = error.message;
                registerErrorMessage.classList.remove('hidden');
                registerErrorMessage.classList.add('block');
            })
    });
});
</script>