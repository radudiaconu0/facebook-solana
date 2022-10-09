<script setup lang="ts">
defineProps<{
    user: any,
}>()
</script>

<template>
    <div>
        <div class="flex items-center my-2">
            <nuxt-img :src="user.profileImage" height="40" width="40" className="rounded-full object-cove" />
            <div className="ml-4 text-[1rem]">{{user.name}}</div>
        </div>
    </div>
</template>

<style scoped>

</style>