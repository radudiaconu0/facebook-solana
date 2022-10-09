<script setup lang="ts">
import { useWallet } from 'solana-wallets-vue';
import { Ref } from 'vue';

const registered = ref(false);
const name = ref("")
const url = ref('https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg')
const users = ref([])
const wallet = useWallet()

const onNameChange = (newName: string) => {
    name.value = newName
}
const createUser = () => {
    registered.value = true
}

const setUrl = (newUrl: string) => {
    url.value = newUrl
}
onMounted(async () => {
    requestUsersData()
})
const requestUsersData = async () => {
    try {
        const { data } = await useFetch<Array<any>>(`/api/fetchUsers`)
        users.value = data.value
    } catch (error) {
        console.error(error)
    }
}
</script>
<template>
    <div class="bg-[#18191a] min-h-screen duration-[0.5s]">
        <Header :name="name" :url="url"></Header>
        <div v-if="registered" class="flex">
            <Sidebar :name="name" :url="url"></Sidebar>
            <div class="flex-1 flex justify-center">
                <Feed :name="name" :url="url" :connected="wallet.connected.value"></Feed>
            </div>
            <RightSidebar :users="users"></RightSidebar>
        </div>
        <div v-else class="flex items-center justify-center w-screen h-[70vh]">
            <Signup @set-url="setUrl" :registered="registered" :name="name" :url="url" @input-name="onNameChange"
                @register="createUser"></Signup>
        </div>
    </div>
</template>