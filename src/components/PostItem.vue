<template>
    <div class="flex flex-col">
        <div class="block mb-2">
            <p class="text-white-snow">{{ props.displayName }}</p>
            <p class="text-gray font-light ">@{{ props.username }}</p>
        </div>
        <div class="block bg-regular-blue p-4 rounded-xl">
            <p class="text-white-snow">{{ props.description }}</p>
        </div>
        <div class="flex justify-end">
            <p class="text-gray text-sm ">
                {{ new Date(props.createdAt).toLocaleString('en-UK', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }) }}
            </p>
        </div>
    </div>
</template>


<script setup>
const props = defineProps({
    id: [String, Number],
    displayName: String,
    username: String,
    description: String,
    createdAt: String,
});
</script>