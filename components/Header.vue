<script lang="ts" setup>
import { WalletMultiButton } from 'solana-wallets-vue';
import useWalletBalance from '~~/composables/useWalletBalance';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { SOLANA_HOST } from "~~/utils/const";
import { useWallet } from 'solana-wallets-vue';
defineProps<{
    name: string;
    url: string;
}>();
const { connected } = useWallet();
const balance = ref(0.0);
watch(connected, async () => {
    balance.value = await useWalletBalance();
})

</script>
<template>
    <div
        class="flex items-center w-full h-[4rem] justify-around px-[1rem] py-[0.2rem] sticky top-0 bg-[#252526] shadow-[0px 5px 8px -9px rgba(0, 0, 0, 0.75)] z-20">
        <div class="flex justify-center gap-[0.6rem]">
            <nuxt-img class="items-center flex object-contain"
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png'
                alt="FB Logo" height="30" width="30">
            </nuxt-img>
            <div class="flex items-center bg-[#3a3b3d] max-w-[18rem] rounded-full py-2 px-2 text-[#b0b3b8]">
                <Icon name="fa:search"></Icon>
                <input type="text" placeholder="Search Facebook"
                    class="border-none px-[0.6rem] bg-transparent outline-none w-[18rem] text-white placeholder:text-[#b0b3b8]border-none px-[0.6rem] bg-transparent outline-none w-[18rem] text-white placeholder:text-[#b0b3b8]">
            </div>
        </div>
        <div class="flex-1 flex items-center justify-center h-full">
            <div class="flex justify-center h-full py-2">
                <div
                    class="flex items-center px-[1.8rem] cursor-pointer duration-[0.5s]  hover:bg-[#555657] rounded-[10px]">
                    <Icon name="ant-design:search-outlined" class="text-2xl text-[#666]"></Icon>
                </div>
                <div
                    class="flex items-center px-[1.8rem] cursor-pointer duration-[0.5s]  hover:bg-[#555657] rounded-[10px]">
                    <Icon name="bi:display" class="text-2xl text-[#666]"></Icon>
                </div>
                <div
                    class="flex items-center px-[1.8rem] cursor-pointer duration-[0.5s]  hover:bg-[#555657] rounded-[10px]">
                    <Icon name="mingcute:group-line" class="text-2xl text-[#666]"></Icon>
                </div>
                <div
                    class="flex items-center px-[1.8rem] cursor-pointer duration-[0.5s]  hover:bg-[#555657] rounded-[10px]">
                    <Icon name="mdi:facebook-gaming" class="text-2xl text-[#666]"></Icon>
                </div>
            </div>
        </div>
        <div class="flex h-min">
            <div v-if="name"
                class="bg-[#31e3bd] hover:bg-[#438791] flex items-center px-3 mx-2 rounded-[0.2rem] cursor-pointer">
                <nuxt-img :src="url" height="20" width="20" alt="user image" class="rounded-full object-cover">
                </nuxt-img>
                <div class="font-bold ml-2 text-black">{{name}}</div>
            </div>
            <ClientOnly>
                <WalletMultiButton dark />
            </ClientOnly>
            <div
                class="bg-[#ec55bc] hover:bg-[#572079] text-black flex items-center px-3 mx-2 rounded-[0.2rem] cursor-pointer">
                <img class="object-covers" src="../assets/sol.png" style="height: 20px; width:20px" alt="solana logo" />
                <div class="text-white font-bold ml-2">{{balance.toFixed(2)}} SOL</div>
            </div>
        </div>
    </div>
</template>