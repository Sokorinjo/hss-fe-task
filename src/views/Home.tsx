import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { type Post } from '../lib/types.ts'
import ShowPostsTable from '../components/Table.tsx'
import NewItemForm from '../components/NewItemForm.tsx'
import { PostsContext } from '../context/postsContext.ts'

export default function Home() {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])

  //Fetch posts from URL
  const {isLoading, isError, isSuccess} = useQuery({
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
        <p></p>
        <div>
          <PostsContext.Provider value={{filteredPosts, setFilteredPosts}}>
            <NewItemForm filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts}/>
            <ShowPostsTable filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts}/>
          </PostsContext.Provider>
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

