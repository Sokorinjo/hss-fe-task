import { useState } from 'react'

type Props = {}

export default function SubmitFormButton({}: Props) {
  const [showForm, setShowForm] = useState(false)

  let display = showForm ? "" : "none"

  //Form submit
  function handleSubmit(e) {
    e.preventDefault()
    console.log('form')
  }

  //Handle form display option
  function handleShowForm() {
    setShowForm(prev => !prev)
    console.log(showForm)
  }

  return (
    <div className='flex flex-col items-start'>
      <div>
        <button onClick={handleShowForm} className='mb-5 '>New Post</button>
      </div>
      <div>
        <form action="" 
        onSubmit={handleSubmit} 
        // style={showForm ? {display: ''}: {display: "none"}} 
        style={{display: display}}
        className="">
          <input type="text" name="Title" placeholder='Post title'/>
          <input type="text" name="Body" placeholder='Post body'/>
          <button type="submit">Add Post</button>
        </form>
      </div>
    </div>
  )
}