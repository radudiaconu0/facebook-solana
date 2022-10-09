<script setup lang="ts">
import { useToast } from "vue-toastification";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useWallet } from 'solana-wallets-vue';

import { SOLANA_HOST } from "../utils/const";
import { initWorkspace } from "../utils/get-program";
import * as anchor from "@project-serum/anchor";
import CreatePost from "./CreatePost.vue";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { connected } from "process";

TimeAgo.setDefaultLocale(en.locale)
const toast = useToast();
const loading = ref(false);
const props = defineProps<{
    name: string;
    url: string;
    connected: boolean;
}>();

const { BN, web3 } = anchor;
const utf8 = anchor.utils.bytes.utf8
const { SystemProgram } = web3
const { program, wallet } = initWorkspace()
const defaultAccounts = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
}
const posts = ref([])

onMounted(async () => {
    await getAllPosts()
})

const getAllPosts = async () => {
    try {
        const postData = await program.value.account.postAccount.all();
        postData.sort((a, b) => b.account.postTime.toNumber() - a.account.postTime.toNumber());
        posts.value = postData;
    } catch (error) {
        console.log(error)
    }
}
watchEffect(async () => {
    if (props.connected) {
        await getAllPosts()
    }
})
watch((posts), () => {
    toast("New post added", {
        icon: "🔁",
        bodyClassName: "toast",
    })
})

const savePost = async (text: string) => {
    let [stateSigner] = await anchor.web3.PublicKey.findProgramAddress(
        [utf8.encode('state')],
        program.value.programId,
    )

    let stateInfo

    try {
        stateInfo = await program.value.account.stateAccount.fetch(stateSigner)
    } catch (error) {
        await program.value.methods.createState().accounts({
            state: stateSigner,
            authority: wallet.value.publicKey,
            ...defaultAccounts,
        }).rpc();
        stateInfo = await program.value.account.stateAccount.fetch(stateSigner)
        return
    }

    let [postSigner] = await anchor.web3.PublicKey.findProgramAddress(
        [utf8.encode('post'), stateInfo.postCount.toArrayLike(Buffer, 'be', 8)],
        program.value.programId,
    )

    try {
        await program.value.account.postAccount.fetch(postSigner)
    } catch {
        await program.value.methods.createPost(text, props.name, props.url)
            .accounts({ state: stateSigner, post: postSigner, authority: wallet.value.publicKey, ...defaultAccounts })
            .rpc();

        posts.value = await program.value.account.postAccount.all()
    }
}



const saveComment = async (text: string, index, count) => {
    console.log(text)
    let [postSigner] = await anchor.web3.PublicKey.findProgramAddress(
        [utf8.encode('post'), index.toArrayLike(Buffer, 'be', 8)],
        program.value.programId,
    )
    let [commentSigner] = await anchor.web3.PublicKey.findProgramAddress(
        [
            utf8.encode('comment'),
            index.toArrayLike(Buffer, 'be', 8),
            count.toArrayLike(Buffer, 'be', 8),
        ],
        program.value.programId,
    )
    try {

        // await program.value.methods.createComment(text, props.name, props.url).accounts({
        //     post: postSigner,
        //     comment: commentSigner,
        //     authority: wallet.value.publicKey,
        //     ...defaultAccounts,
        // }).rpc()

        await program.value.account.commentAccount.fetch(commentSigner)
    } catch (error) {
        await program.value.methods.createComment(text, props.name, props.url).accounts({
            post: postSigner,
            comment: commentSigner,
            authority: wallet.value.publicKey,
            ...defaultAccounts,
        }).rpc()
        // console.error(error)
    }
}

</script>
<template>
    <div class="flex-1 max-w-2x1 mx-4">
        <div>
            <div v-if="loading">
                Loading...
            </div>
            <div v-else>
                <CreatePost @savePost="savePost" @getAllPosts="getAllPosts" :url="url" :name="name"></CreatePost>
                <Post v-for="post in posts" :program="program" :wallet="wallet" :key="post.account.index"
                    :post="post.account" @createComment="saveComment" :name="name" :url="url"></Post>
            </div>
        </div>

    </div>
</template>
<style scoped>
.toast {
    border-radius: 10px;
    background-color: '#252526';
    color: '#fffcf9';
}
</style>