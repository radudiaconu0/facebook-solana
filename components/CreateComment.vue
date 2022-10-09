<script setup lang="ts">
const props = defineProps<{
    name: string,
    url: string,
    text: string,
}>();

const emit = defineEmits<{
    (event: 'createComment', text: string): void
}>()


</script>

<template>
   
</template>

<style scoped>

</style>