<template>
    <div class="flex flex-col">
        <div class="block mb-2">
            <p class="text-white-snow">{{ props.displayName }}</p>
            <p class="text-gray font-light italic">{{ props.username }}</p>
        </div>
        <div class="block bg-regular-blue p-2 rounded-xl">
            <p class="text-white-snow">{{ props.description }}</p>
        </div>
        <div class="flex justify-end">
            <p class="text-gray text-sm italic">{{ props.createdAt }}</p>
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