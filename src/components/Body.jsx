import {useSelector, useDispatch} from 'react-redux'
import { fetchInfo, fetchRepo, fetchFollower, fetchFollowing } from '../features/github/githubSlice'
// import githubSlice from '../features/github/githubSlice'
import { useState } from 'react'

function Body() {
  const [idName, setIdName] = useState('')

  const dispatch = useDispatch()

  const {gitinfo, gitrepo, followers, following, isLoading, isError, message} = useSelector((state) => {
    return state.github
  })

  const onSubmit = (e) =>{
    e.preventDefault()
    dispatch(fetchInfo(idName))
    dispatch(fetchRepo(idName))
    dispatch(fetchFollower(idName))
    dispatch(fetchFollowing(idName))
    setIdName('')
  }

  const userImage = `https://avatars.githubusercontent.com/u/${gitinfo.id}?v=4`

  const sortedGitRepos = gitrepo.slice().sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
  });

  return (
      <div className='container'>

        <form action="" onSubmit={onSubmit}>
          <div class="input-group mt-3 mb-3">
            <label htmlFor="text" class="input-group-text">@</label>
            <input type="text" class="form-control" name='idName' value={idName} placeholder='Github Username' onChange={(e)=>setIdName(e.target.value)}/>
          </div>

          <div className='text-center'>
            <button type='submit' className='btn btn-primary btn-dark'>Fetch Information</button>
          </div>
        </form>

        <div className='border border-dark mt-3 mb-3 p-3 rounded d-flex justify-content-around'>
          <div className='mt-3 mb-3'>            
            <h2>{gitinfo.name}</h2>
            <p>Bio: {(!gitinfo.bio) ? 'Bio Missing.' : `${gitinfo.bio}`}</p>
          </div>
          <div>
            <img className="rounded-circle" width="150" height="150" src={userImage} alt="User image here." />  
          </div>
        </div>


        <div className="border border-dark mt-3 mb-3 p-3 rounded">
        <h2>Repositories</h2>

          <div className='d-flex flex-wrap justify-content-start'> 
              {sortedGitRepos.map((item)=>{
                return (
                  <div className='m-3'>
                    <h2>{item.name}</h2>
                        <p><b>Visibility :</b> {(!item.private)? 'Public' : 'Private'}</p>
                        <p><b>Created At :</b> {new Date(item.created_at).toLocaleString("en-US", { timeZone: "America/New_York" })}</p>
                  </div>                  
                )
              })}
          </div>
        </div>

      <div>
        <h2>Social</h2>

        <p>Followers: {gitinfo.followers}</p>

        <div className='d-flex flex-wrap justify-content-start text-center'>
        {followers.map((item)=>{
          return(  
            <div className='m-3'>          
              <img className="rounded-circle mb-3" width="80" height="80" src={`https://avatars.githubusercontent.com/u/${item.id}?v=4`} alt="Follower image here."/>
              <p><b>@</b>{item.login}</p>
            </div>
          )
        })}
        </div>


        <p>Following: {gitinfo.following}</p>

        <div className='d-flex flex-wrap justify-content-start text-center'>
        {following.map((item)=>{
          return(  
            <div className='m-3'>          
              <img className="rounded-circle mb-3" width="80" height="80" src={`https://avatars.githubusercontent.com/u/${item.id}?v=4`} alt="Following user image here."/>
              <p><b>@</b>{item.login}</p>
            </div>
          )
        })}
        </div>

      </div>
    </div>
  )
}

export default Body