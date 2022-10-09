import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: 'production',
    token: process.env.SANITY_TOKEN,
    apiVersion: 'v1',
    useCdn: false,
})
