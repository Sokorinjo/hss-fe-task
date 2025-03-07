import React, { useState } from 'react'
import { Post } from './lib/types'
import { usePostsStore } from './app/store'

type PostsTableProps = {
  filteredPosts: []
}

const ShowPostsTable = ({filteredPosts}: PostsTableProps) => {
  const [rowCount, setRowCount] = useState(0)

  function onCheckChange(e) {
    if(e.target.checked){
      console.log(`Checked: ${e.target.id}`)
    }
  }

  // const count = usePostsStore((state) => state.count)
  
  return (
   <div className=' rounded-xl bg-black'>
        <table className='table-auto'>
          <thead className=' border-zinc-200 '>
            <tr className=''>
              <th>Id</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post: Post) =>
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <input type="checkbox" id={post.id.toString()} className='ml-5 mr-5 size-5' onClick={(e) => onCheckChange(e)}/>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          <p>Rows Selected: {}</p>
        </div>
      </div>
  )
}

export default ShowPostsTable