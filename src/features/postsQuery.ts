import { useQuery } from '@tanstack/react-query'
import { type Post } from '../lib/types'

export const usePostsQuery =() =>{
  return useQuery({
      queryKey: ['posts'],
      queryFn: async () => {
        const response = await fetch('http://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        const filteredPosts = data.filter((post: Post) => {
          return post.userId === 1
        })
        return filteredPosts
}})
}
