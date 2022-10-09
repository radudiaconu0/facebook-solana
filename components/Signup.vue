<script setup lang="ts">
const props = defineProps<{
    registered: boolean
    name: string
    url: string
}>()

// define an emit when the use rinput data
const emit = defineEmits<{
    (e: 'inputName', name: string): void
    (e: 'register'): void
    (e: 'setUrl', url:string): void
}>()
const generateRandomProfileImageUrl = () => {
    const url =`https://avatars.dicebear.com/api/pixel-art-neutral/${Math.floor(
        Math.random() * 100,
    )}.svg`
    emit('setUrl', url)
}
    

const createUser = async event => {
    console.log('create user')
    if ("solana" in window) {
        const resp = await window.solana.connect()
        const walletAddress = resp.publicKey.toString()
        console.log(walletAddress)
        try {
            await useFetch(`/api/createUser`, {
                method: 'POST',
                body: {
                    name: props.name,
                    profileImage: props.url,
                    walletAddress: walletAddress
                },
            })
            emit('register')
        } catch (error) {
            console.error(error)
        }
    }
    else {
        console.log("solana not found")
    }
}

</script>
<template>
    <div class="flex flex-col p-4 justify-center items-center h-full w-full bg-[#252526] w-min h-min rounded-2x1">
        <div>
            <nuxt-img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
                height="40" width="40" alt="facebook logo"></nuxt-img>
        </div>
        <div class="text-[#afb3b8] font-semibold text-lg">Please sign up to use facebook</div>
        <form @submit.prevent="createUser" class="flex flex-col items-center">
            <div class="my-4">
                <div class="text-[#afb3b8] font-semibold mb-2 ml-3">Name</div>
                <div class="flex items-center w-[20rem] bg-[#3a3b3d] rounded-full">
                    <input class="bg-transparent flex-1 m-2 outline-none text-white px-2" v-model="name"
                        @input="$emit('inputName', name)" required>
                </div>
            </div>
            <div class="my-4">
                <div class="text-[#afb3b8] font-semibold mb-2 ml-3">Profile Image</div>
                <div class="flex items-center w-[20rem] bg-[#3a3b3d] rounded-full">
                    <input class="bg-transparent flex-1 m-2 outline-none text-white px-2" :value="props.url" required>
                    <div @click="generateRandomProfileImageUrl"
                        class="h-full bg-[#2d2d2d] hover:bg-[#252626] text-white px-2 py-1 mx-1 hover:px-3 rounded-full cursor-pointer duration-[0.2s] ease-in-out">
                        Random
                    </div>
                </div>

            </div>
            <button type="submit"
                class="bg-[#3a3b3d] text-white font-semibold px-4 py-2 hover:px-6 rounded-full cursor-pointer duration-[0.2s] ease-in-out">
                Sign Up
            </button>
        </form>
    </div>
</template>