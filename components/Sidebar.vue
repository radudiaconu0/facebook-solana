<script setup lang="ts">
    const sideBarDatas = [
        {
            icon: './assets/friends.png',
            title: 'Friends',
        },
        {
            icon: './assets/groups.png',
            title: 'Groups',
        },
        {
            icon: './assets/marketplace.png',
            title: 'Marketplace',
        },
        {
            icon: './assets/watch.png',
            title: 'Watch',
        },
        {
            icon: './assets/memories.png',
            title: 'Memories',
        },
        {
            icon: './assets/dropdown.png',
            title: 'See More',
        }
    ]
    defineProps<{
        name: string,
        url: string,
    }>()
    </script>
    
    <template>
        <div class="py-[25px] px-[10px] w-[24rem]">
            <div class="flex w-full mb-[20px] hover:bg-[#2a2b2c] transition-all duration-300 ease-in-out rounded-lg p-[5px] gap-[10px] cursor-pointer">
                <nuxt-img class="rounded-full object-cover" :src="url" height="40" width="40" alt="profileImage">
    
                </nuxt-img>
                <div class="text-white font-semibold flex items-center  flex-col justify-center text-sm">
                    {{ name }}
                </div>
            </div>
            <div v-for="(sideBarData, index) in sideBarDatas" :key="index" class="flex w-full mb-[20px] hover:bg-[#2a2b2c] transition-all duration-300 ease-in-out rounded-lg p-[5px] gap-[10px] cursor-pointer">
                <img class="text-white font-semibold flex items-center  flex-col justify-center text-sm" :src="sideBarData.icon" height="30" width="30" alt="sideBar">
                <div class="text-white font-semibold flex items-center  flex-col justify-center text-sm">{{sideBarData.title}}</div>
            </div>
        </div>
    </template>
    
    <style scoped>
    
    </style>