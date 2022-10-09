import { client } from '../../lib/sanity'

export default defineEventHandler(async (event) => {
    try {
        const query = `
          *[_type == "users"]{
              name,
              walletAddress,
              profileImage,
            }
        `

        const sanityResponse = await client.fetch(query)

        event.res.statusCode = 200
        event.res.setHeader('Content-Type', 'application/json')
        event.res.end(JSON.stringify(sanityResponse))

    } catch (error) {
        event.res.statusCode = 500
        event.res.setHeader('Content-Type', 'application/json')
        event.res.end(JSON.stringify({ message: error.message }))
    }
})