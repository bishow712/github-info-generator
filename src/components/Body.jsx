import {useSelector, useDispatch} from 'react-redux'
import { fetchInfo } from '../features/github/githubSlice'
import githubSlice from '../features/github/githubSlice'
import { useEffect } from 'react'
import { useState } from 'react'

function Body() {
  const [idName, setIdName] = useState('')

  const dispatch = useDispatch()

  const {gitinfo, isLoading, isError, message} = useSelector((state) => {
    return state.github
  })

  const onSubmit = (e) =>{
    e.preventDefault()
    dispatch(fetchInfo(idName))
    setIdName('')
  }

  return (
    <>
      <div>

        <form action="" onSubmit={onSubmit}>
          <label htmlFor="text">Github Id goes here.</label>
          <input type="text" name='idName' value={idName} placeholder='Enter you GitHub id here.' onChange={(e)=>setIdName(e.target.value)}/>
          <button type='submit'>Fetch Information</button>
        </form>

        <h2>{gitinfo.login}</h2>
      </div>
    </>
  )
}

export default Body