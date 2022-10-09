<script setup lang="ts">

const emmit = defineEmits(["savePost", "getAllPosts"]);
const input = ref('')
defineProps<{
    name: string;
    url: string;
}>()
const handleSubmit = () => {
    emmit("savePost", input.value)
    input.value = ''
}
</script>

<template>
    <div
        class="w-[100%] flex mt-[1rem] flex-col rounded-[0.6rem] bg-[#252526] p-2 pt-4 pb-0 shadow-[0px 5px 7px-7px rgba(0,0,0,0.75)]">
        <div class="flex pb-3 mb-2 border-b border-[#404041]">
            <nuxt-img :src="url" alt="profileImage" class="rounded-full object-cover" height="40" width="40"></nuxt-img>
            <form class="flex-1 flex items-center" @submit.prevent="handleSubmit">
                <input v-model="input"
                    class="flex-1 py-[0.6rem] px-[1rem] mx-[0.6rem] rounded-full bg-[#3a3b3d] outline-none border-none text-white"
                    :placeholder="name" />
                <button class="invisible" type="submit"></button>
            </form>
        </div>
        <div class="flex justify-evenly pb-2">
            <div
                class="flex flex-1 items-center justify-center p-2 text-[#555] cursor-pointer hover:bg-[#404041] rounded-[0.5rem] transition-all duration-300 ease-in-out">
                <Icon name="bi:camera-video-fill" class="text-red-500" />
                <div class="font-semibold ml-[0.6rem] text-lg text-[#afb3b8]">Live Video</div>
            </div>
            <div
                class="flex flex-1 items-center justify-center p-2 text-[#555] cursor-pointer hover:bg-[#404041] rounded-[0.5rem] transition-all duration-300 ease-in-out">
                <Icon name="bi:file-image-fill" class="text-red-500" />
                <div class="font-semibold ml-[0.6rem] text-lg text-[#afb3b8]">Photo Video</div>
            </div>
            <div
                class="flex flex-1 items-center justify-center p-2 text-[#555] cursor-pointer hover:bg-[#404041] rounded-[0.5rem] transition-all duration-300 ease-in-out">
                <Icon name="heroicons-outline:refresh" class="text-blue-500" />
                <div class="font-semibold ml-[0.6rem] text-lg text-[#afb3b8]" @click="$emit('getAllPosts')">Refresh Posts</div>
            </div>
        </div>
    </div>
</template>