
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const imageAPI = createApi({
    reducerPath: 'imageAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.thecatapi.com/v1/images/search' }),
    endpoints: ((build) => (
        {
            fetchRandomImage: build.query({
                query: () => ({
                    url: ``,
                })
            }),
            fetchAllImages: build.query({
                query: (_limit: number = 10,) => ({
                    url: ``,
                    params: {
                        limit: _limit,
                        breed_ids: "beng",
                        api_key: "live_yu0J7WhUfBo0l1NIZhjoAtilwzoTRxbOINILL4AHG71Es8MKVbpM4bI9hRug212i"
                    }
                })
            }),
        }
    ))
})