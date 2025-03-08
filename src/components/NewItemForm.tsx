import { useState } from 'react'
import { type Post } from '../lib/types'

type Props = {
  filteredPosts: Post[]
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

const inputClass = {
  style: "h-7 placeholder:text-gray-400 text-gray-900 rounded-sm pl-2 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600"
}

export default function NewItemForm({ filteredPosts, setFilteredPosts }: Props) {
  const [showForm, setShowForm] = useState(false)
  const [newPost, setNewPost] = useState<Post>({
    userId: 0,
    id: 0,
    title: "",
    body: ""
  })
  const disableButton = newPost.title && newPost.body ? false : true

  //show/hide form
  let display = showForm ? "" : "none"

  //check highest id
  const highestId = filteredPosts.length ? Math.max(...filteredPosts.map((item) => item.id + 1)) : 1;

  //Handle inputs
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPost({
      ...newPost,
      userId: 1,
      id: highestId,
      [e.target.name]: e.target.value
    })

  }
  //Form submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFilteredPosts([...filteredPosts, newPost])
    setNewPost({
      userId: 0,
      id: 0,
      title: "",
      body: ""
    })
  }

  //Handle form display option
  function handleShowForm() {
    setShowForm(prev => !prev)
    console.log(showForm)
  }

  return (
    <div className='flex flex-col items-start'>
      <div>
        <button 
        onClick={handleShowForm} 
        className='mb-5 bg-blue-500 rounded-md pl-5 pr-5 h-8 hover:bg-blue-700 cursor-pointer'
        >New Post</button>
      </div>
      <div className=''>
        <form action=""
          onSubmit={(e) => handleSubmit(e)}
          // style={showForm ? {display: ''}: {display: "none"}} 
          style={{ display: display }}
          className="mb-5 bg-amber-50 p-3 flex gap-6 rounded-xl items-end" >
          {/* Title input */}
          <div className='flex flex-col items-start'>
            <label htmlFor="title" className='text-black font-bold'>Title</label>
            <input
              value={newPost.title}
              onChange={(e) => handleInputChange(e)}
              type="text" name="title" placeholder='Post title'
              className={inputClass.style} />
          </div>
          {/* Body input */}
          <div className='flex flex-col items-start'>
            <label htmlFor="body" className='text-black font-bold'>Title</label>
            <input
              value={newPost.body}
              onChange={(e) => handleInputChange(e)}
              type="text" name="body" placeholder='Post body'
              className={inputClass.style} />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            disabled={disableButton}
            className="bg-blue-500 rounded-md pl-5 pr-5 h-8 hover:bg-blue-700 cursor-pointer disabled:bg-gray-600 disabled:cursor-default">Add Post</button>
        </form>
      </div>
    </div>
  )
}