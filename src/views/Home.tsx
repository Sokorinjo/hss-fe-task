import { useEffect, useState } from 'react'
import { type Post } from '../lib/types.ts'
import ShowPostsTable from '../components/Table.tsx'
import NewItemForm from '../components/NewItemForm.tsx'
import { usePostsQuery } from '../features/postsQuery.ts'

export default function Home() {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  
  const{data, isLoading, isError, isSuccess} = usePostsQuery()
  useEffect(() => {
    if(data){
      setFilteredPosts(data)
    }
  }, [data])

  //Check if loading
  if (isLoading) return <div>Loading...</div>
  
  //Check if error occured
  if (isError) return <div>Error has occured</div>
  
  if (isSuccess) {
    return (
      <>
        <h1 className=''>Home</h1>
        <p></p>
        <div>
          <div className='flex justify-between'>
            <NewItemForm filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} />
          </div>
          <ShowPostsTable filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} />
        </div>
      </>
    )
  }
}
//Fetch posts from URL
//const { isLoading, isError, isSuccess } = useQuery({
//   queryKey: ['posts'],
//   queryFn: async () => {
//     const response = await fetch('http://jsonplaceholder.typicode.com/posts')
//     const data = await response.json()
//     const filteredPosts = data.filter((post: Post) => {
//       return post.userId === 1
//     })
//     setFilteredPosts(filteredPosts)
//     return filteredPosts
//   }
//})


