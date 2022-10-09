<script setup lang="ts">
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { web3, utils, BN } from '@project-serum/anchor';
import { initWorkspace } from '~~/utils/get-program';
const utf8 = utils.bytes.utf8
const props = defineProps<{
    name: string;
    url: string;
    post: any;
}>()
const { program, wallet } = initWorkspace()
const emits = defineEmits({
    'viewDetail': (postIndex, post: any) => [],
    'createComment': (text: string, postId: any, postCommentCount: any) => true,
})
TimeAgo.addLocale(en)

const timeAgo = new TimeAgo('en-US')
const isCommentSectionOpen = ref(false)
const comments = ref([])
const clockToDateString = (timestamp) => {
    return timeAgo.format(new Date(timestamp.toNumber() * 1000), 'twitter-now')
}
const createCommentForPost = async (text: string) => {
    emits('createComment', text, props.post.index, props.post.commentCount)
}
const commentText = ref('')
const getCommentsOnPost = async (index, oldPost) => {
    try {
        let [postSigner] = await web3.PublicKey.findProgramAddress(
            [utf8.encode('post'), index.toArrayLike(Buffer, 'be', 8)],
            program.value.programId,
        )

        const post = await program.value.account.postAccount.fetch(postSigner)

        let commentSigners = []

        for (let i = 0; i < post.commentCount.toNumber(); i++) {
            let [commentSigner] = await web3.PublicKey.findProgramAddress(
                [
                    utf8.encode('comment'),
                    new BN(index).toArrayLike(Buffer, 'be', 8),
                    new BN(i).toArrayLike(Buffer, 'be', 8),
                ],
                program.value.programId,
            )

            commentSigners.push(commentSigner)
        }

        const comments = await program.value.account.commentAccount.fetchMultiple(
            commentSigners,
        )

        comments.sort((a, b) => a.postTime.toNumber() - b.postTime.toNumber())
        console.log(comments)
        return comments
        
    } catch (error) {
        console.error(error)
    }
}
const showComments = async () => {
    isCommentSectionOpen.value = !isCommentSectionOpen.value
    if (isCommentSectionOpen.value) {
        comments.value = await getCommentsOnPost(props.post.index, props.post)
    }
}
// onMounted(async () => {
//    comments.value = await getCommentsOnPost(props.post.index, props.post)
// })

</script>

<template>
    <div class="w-[100%] mt-[1rem] rounded-[0.6rem] bg-[#252526] text-white p-[0.4rem] pb-0">
        <div class="flex position-relative items-center">
            <nuxt-img :src="post.posterUrl" class="rounded-full" height="44" width="44" alt="publisher profile image">
            </nuxt-img>
            <div class="flex flex-col ml-[0.5rem]">
                <div class="text-sm">{{post.posterName}}</div>
                <div class="text-sm text-[#777]">
                    {{clockToDateString(post.postTime)}}
                </div>
            </div>
        </div>
        <div>
            <div class="py-[1rem] px-[1.2rem]">
                {{post.text}}
            </div>
        </div>
        <div class="border-t border-[#3a3b3e] text-[18px] flex justify-evenly text-[#b0b3b8] cursor-pointer py-1">
            <div class="flex flex-1 items-center justify-center rounded-[0.4rem] hover:bg-[#404041] py-2">
                <Icon name="fluent:thumb-like-16-filled"></Icon>
                <div class="ml-[1rem]">Like</div>
            </div>
            <div class="flex flex-1 items-center justify-center rounded-[0.4rem] hover:bg-[#404041] py-2"
                @click="showComments">
                <Icon name="fa:comment"></Icon>
                <div class="ml-[1rem]">Comment</div>
            </div>
            <div class="flex flex-1 items-center justify-center rounded-[0.4rem] hover:bg-[#404041] py-2">
                <Icon name="bx:refresh"></Icon>
                <div class="ml-[1rem] text-blue-300" @click="showComments">Refresh Comments</div>
            </div>
        </div>
        <CommentSection v-if="isCommentSectionOpen" :comment-text="commentText" :post="post" :comments="comments"
            @createComment="createCommentForPost" :name="name" :url="url"></CommentSection>
    </div>
</template>