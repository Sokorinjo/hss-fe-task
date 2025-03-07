import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ShowPostsTable from './Table.tsx'

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export default function Home() {

  //Fetch posts from URL
  const { data: posts, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  })

  //Check if loading
  if (isLoading) return <div>Loading...</div>

  //Check if error occured
  if (isError) return <div>Error has occured</div>

  //Check if fetch is successful; filter by userId
  let filteredPosts
  if (isSuccess) {
    filteredPosts = posts.filter((post: Post) => {
      return post.userId === 1
    })
    // console.log(filteredPosts)
  }

  return (
    <>
      <h1 className=''>Home</h1>
      <ShowPostsTable filteredPosts={filteredPosts}/>
    </>
  )
}

const getPosts = async () => {
  const response = await fetch('http://jsonplaceholder.typicode.com/posts')
  return await response.json()
}

