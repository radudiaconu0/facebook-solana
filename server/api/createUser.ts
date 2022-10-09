import { client } from '../../lib/sanity'

export default defineEventHandler(async (event) => {
    try {
        const body = await useBody(event)
        console.log('body', body)
        const userDoc = {
          _type: 'users',
          _id: body.walletAddress,
          name: body.name,
          walletAddress: body.walletAddress,
          profileImage: body.profileImage,
        }
    
        await client.createIfNotExists(userDoc)
    
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User created' }),
        }
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: error.message}),
        }
      }
})