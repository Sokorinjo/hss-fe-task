import { useContext, useEffect, useState } from 'react'
import { type Post } from '../lib/types'
import { usePostsStore } from '../app/store'
import DeleteSelectedPosts from './DeleteSelectedPosts'
import { PostsContext } from '../context/postsContext'

type Props = {
  filteredPosts: Post[],
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

const searchInputClass = {
  style: " w-full bg-amber-50 h-8 placeholder:text-gray-400 text-gray-900 rounded-sm pl-2 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600"
}

const ShowPostsTable = ({ filteredPosts, setFilteredPosts }: Props) => {
  const [search, setSearch] = useState("")
  const [ascending, setAscending] = useState(true)

  //Posts store reducers
  const selectedPosts = usePostsStore((state) => state.selectedPosts)
  const appendPost = usePostsStore((state) => state.appendPost)
  const removePost = usePostsStore((state) => state.removePost)

  useEffect(() => {
    console.log(selectedPosts)
  }, [selectedPosts])

  //Find post by id
  function findPostById(id: string) {
    return filteredPosts.find((post) => post.id === Number(id))
  }

  //Check button; change count; append store
  function onCheckChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      const post = findPostById(e.target.id)
      if (post) {
        appendPost(post)
      }
    } else if (!e.target.checked) {
      removePost(Number(e.target.id))
    }
  }

  //Sort table
  function sortTable() {
    setFilteredPosts(prev => [...prev].sort((a: Post, b: Post) =>
      ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    ))
    setAscending(!ascending)
  }

  return (
    <>
      <div className=' rounded-xl w-4xl'>
        <div className='flex mb-1 '>
          <input type="text" 
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search Title' 
          name='search' className={searchInputClass.style} />
        </div>
        <table className='rounded-lg w-full'>
          <thead className=' h-10 bg-blue-500'>
            <tr className=''>
              <th className=''>Id</th>
              <th onClick={sortTable} className='hover:bg-blue-700'>Title {ascending ? "z-a" : "a-z"}</th>
              <th>Body</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='backgrop-blur-xs bg-amber-50 text-black '>
            {filteredPosts.filter((searchPost)=> {
              return search.toLocaleLowerCase() === "" ? searchPost : searchPost.title.toLocaleLowerCase().includes(search)
            }).map((post: Post) =>
              <tr key={post.id} className='border-b-1 border-b-black h-16'>
                <td className='pl-5 pr-5 font-bold'>{post.id}</td>
                <td onClick={sortTable}>{post.title.slice(0, 10)}</td>
                <td>{post.body.slice(0, 50)}...</td>
                <td>
                  <input type="checkbox" id={post.id.toString()} className='ml-5 mr-5 size-5 ' onChange={(e) => onCheckChange(e)} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='flex items-center justify-between  mt-3'>
        <p className='text-2xl'>Rows Selected: {selectedPosts.length}</p>
        <DeleteSelectedPosts filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} />
      </div>
    </>
  )
}

export default ShowPostsTable