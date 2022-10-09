<script setup lang="ts">
defineProps<{
    users: any[],
}>()
</script>

<template>
    <div class="w-[24rem] text-lg text-white">
        <div class="text-[#afb3b8] font-semibold">Sponsored</div>
        <div class="addContainer">
            <div class="flex items-center my-3 mr-[1rem] p-2 rounded-lg">
                <div class="h-full w-[50%] flex items-center mr-[0.5rem]">
                    <nuxt-img class="object-cover" height="100" width="100"
                        src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/284832/settings_images/HpzVcovxQz28Br7GkRyq_15289248_269068140162594_1580546814749307408_o_1_.png"
                        alt="object-cover" />
                </div>
                <div>
                    <div>The #1 Channel for Blockchain Development</div>
                    <div class="text-[#b0b3b8] text-sm">cleverprogrammer.com</div>
                </div>
            </div>
        </div>
        <div class="flex items-center my-3 mr-[1rem] p-2 rounded-lg">
            <div class="h-full w-[50%] flex items-center mr-[0.5rem]">
                <nuxt-img src='https://www.cityam.com/wp-content/uploads/2021/08/Solana-1.jpg' height="100" width="100"
                    class="style.adImage" alt='solana logo' />
            </div>
            <div>
                <div>Powerful for developers. Fast for everyone.</div>
                <div className={style.adLink}>solana.com</div>
            </div>
        </div>
        <div class="w-[95%] border-b border-[0.5px] border-[#3e4042] my-2" />
        <div class="text-[#afb3b8] font-semibold">Contacts</div>
        <div class={style.contactsContainer}>
            <Contact v-for="user in users" :key="user.walletAddress" :user=user />
        </div>
    </div>
</template>

<style scoped>

</style>