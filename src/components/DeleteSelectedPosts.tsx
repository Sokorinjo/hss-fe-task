import React from 'react'
import { usePostsStore } from '../app/store'
import { type Post } from '../lib/types'

type Props = {
  filteredPosts: Post[],
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

export default function DeleteSelectedPosts({setFilteredPosts}: Props) {
  const selectedPosts = usePostsStore((state) => state.selectedPosts)
  const clearPostsArray = usePostsStore((state) => state.clearPostsArray)

  const disableButton = selectedPosts.length === 0 ? true : false

  function handleClick() {
    console.log('deleted')
    setFilteredPosts(prev => prev.filter((post) => !selectedPosts.includes(post)))
    clearPostsArray()
  }

  return (
    <div>
      <button onClick={handleClick} 
      disabled={disableButton}
      className='bg-red-500 rounded-md pl-5 pr-5 h-8 hover:bg-red-700 cursor-pointer disabled:bg-gray-600 disabled:cursor-default'>Delete Selected</button>
    </div>
  )
}