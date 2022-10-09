<script setup lang="ts">
const props = defineProps<{
    comments: any[],
    name: string,
    url: string,
    post: any,
    commentText: string,
}>();
const emits = defineEmits(['createComment']);
const input = ref('')
const postComment = async event => {
    emits('createComment', input.value);
}
</script>
<template>
    <div
        class="w-full rounded-b-lg p-[5px] flex justify-center-center flex-col border-t border-gray-300 border-[#3a3b3e] pt-4">
        <comment v-for="(comment, index) in props.comments" :key="index" :comment="comment"></comment>
        <div class="flex items-center">
            <nuxt-img class="rounded-full" :src="url" height="44" width="44" alt="profile image"></nuxt-img>
        </div>
        <div class="flex flex-1 h-10 bg-[#3a3b3c] rounded-full px-[1rem]">
            <form @submit.prevent="postComment" class="flex flex-1 items-center">
                <input type="text" class="w-full bg-transparent outline-none" v-model="input"
                    placeholder="Write a comment..." />
            </form>
            <div class="flex items-center gap-[0.4rem]">
                <Icon size="20" class="cursor-pointer text-[#a6a9ae]" name="ic:baseline-insert-emoticon" />
                <Icon size="20" class="cursor-pointer text-[#a6a9ae]" name="teenyicons:camera-outline" />
                <Icon size="20" class="cursor-pointer text-[#a6a9ae]" name="ri:file-gif-line" />
                <Icon size="20" class="cursor-pointer text-[#a6a9ae]" name="bx:sticker" />
            </div>
        </div>
    </div>
</template>