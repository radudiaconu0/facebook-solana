<script setup lang="ts">
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

defineProps<{
    comment: any;
}>();

</script>
<template>
    <div class="flex">
        <div class="object-cover mr-2">
            <nuxt-img class="rounded-full" :src="comment.commenterUrl" height="40" width="40"></nuxt-img>
        </div>
        <div class="bg-[#3a3b3c] rounded-2xl text-white py-2 px-3">
            <div class="text-[#a6aba4] text-sm font-semibold">{{comment.commenterName}}</div>
            <div>{{comment.text}}</div>
        </div>

    </div>
    <div class="flex items-center gap-[1rem] ml-[3.4rem] mb-[1rem] mt-1">
        <div class="text-[#a6aba4] text-sm font-bold cursor-pointer">Like</div>
        <div class="text-[#a6aba4] text-sm font-bold cursor-pointer">Reply</div>
        <div class="text-[#a6aba4] text-sm">{{timeAgo.format(new Date(comment.postTime.toNumber()*1000),
        'twitter-now')}}</div>
    </div>
</template>

<style scoped>

</style>