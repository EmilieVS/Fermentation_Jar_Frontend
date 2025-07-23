<template>
    <div class="flex flex-col justify-center items-center h-screen bg-dark-blue">
        <div class="absolute top-3 left-3 h-10 w-10">
            <RouterLink to="/home">
                <img src="../assets/icons/back_arrow_button.png" alt="Back Arrow Button" class="">
            </RouterLink>
        </div>

        <form id="login-form"
            class="flex flex-col justify-center items-left w-4/5 md:w-1/2 gap-3 font-body bg-regular-blue text-white-snow p-8 rounded-2xl">
            <h2 class="text-3xl font-semibold">Login</h2>

            <div class="flex flex-col gap-1">
                <label for="email">Email</label>
                <input id="email" type="text" name="email" placeholder="email@example.com" required
                    class="rounded-xl bg-dark-blue p-2">
            </div>

            <div class="flex flex-col gap-1">
                <label for="password">Password</label>
                <input id="password" type="password" name="password" placeholder="your password" required
                    class="rounded-xl bg-dark-blue p-2">
            </div>

            <p id="login-error-message" class="hidden">
                Invalid email or password, please try again.
            </p>

            <div class="flex items-center justify-center">
                <button type="submit" class="w-1/2 bg-light-blue text-dark-blue font-semibold p-1 rounded-xl">
                    Continue
                </button>
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
    const loginForm = document.querySelector('#login-form');
    const loginErrorMessage = document.querySelector('#login-error-message');

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        fetch("http://localhost:8000/api/login", {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                auth.setToken(data.access_token);
                router.push('/home');
            })
            .catch(error => {
                console.log(error);
                loginErrorMessage.classList.remove('hidden');
                loginErrorMessage.classList.add('block');
            })
    });
});
</script>