import { useQuery } from '@tanstack/react-query'
import { Post } from '../lib/types.ts'
import ShowPostsTable from '../components/Table.tsx'
import ShowFormButton from '../components/ShowFormButton.tsx'
import { useEffect, useState } from 'react'

export default function Home() {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  
  //Fetch posts from URL
  const { data, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('http://jsonplaceholder.typicode.com/posts')
      const data = await response.json()
      const filteredPosts = data.filter((post: Post) => {
        return post.userId === 1
      })
      setFilteredPosts(filteredPosts)
      return filteredPosts
  }})

  //Check if loading
  if (isLoading) return <div>Loading...</div>
  
  //Check if error occured
  if (isError) return <div>Error has occured</div>

  if(isSuccess) {
    return (
    <>
        <h1 className=''>Home</h1>
        <div>
          <ShowFormButton />
          <ShowPostsTable filteredPosts={filteredPosts}/>
        </div>
      </>
    )
  }

}

// const getPosts = async () => {
//   const response = await fetch('http://jsonplaceholder.typicode.com/posts')
//   const data = await response.json()
//   const filteredPosts = data.filter((post: Post) => {
//     return post.userId === 1
//   }) 
//   return filteredPosts
// }

