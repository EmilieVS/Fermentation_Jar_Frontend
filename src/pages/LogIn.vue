<template>
    <form action="" class="flex flex-col gap-2 font-body bg-regular-blue text-white p-2">
        <h2>Login</h2>
        <label for="email">Email</label>
        <input type="text" name="email" placeholder="email@example.com" required class="rounded bg-dark-blue">
        <label for="password">Password</label>
        <input type="text" name="password" placeholder="your password" required class="rounded bg-dark-blue">
        <p id="login-error-message" class="hidden">
            Invalid email or password, please try again!
        </p>
        <button type="submit" class="bg-light-blue">Continue</button>
    </form>
</template>

<script setup>

</script>