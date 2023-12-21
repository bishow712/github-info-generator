import {useSelector, useDispatch} from 'react-redux'
import { fetchInfo, fetchRepo, fetchFollower, fetchFollowing, reset } from '../features/github/githubSlice'
import githubSlice from '../features/github/githubSlice'
import { useState, useEffect } from 'react'
import React from 'react'

function Body() {
  const [idName, setIdName] = useState('')
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch()

  const {gitinfo, gitrepo, followers, following, isLoading, isError, message} = useSelector((state) => {
    return state.github
  })

  // useEffect(()=>{
  //   gitrepo.map((item)=>{
  //     dispatch(fetchLanguage([item.name, idName]))
  //   })
  // },[gitrepo])

  const onSubmit = (e) =>{
    e.preventDefault()
    dispatch(fetchInfo(idName))
    dispatch(fetchRepo(idName))
    dispatch(fetchFollower(idName))
    dispatch(fetchFollowing(idName))

    setIdName('')
    setSubmitted(true)
  }

  const onReset = (e) => {
    e.preventDefault()
    dispatch(reset())
    setSubmitted(false)
  }


  if(isLoading){
    return (
      <div className='position-absolute top-50 start-50 translate-middle'>
        <div className="loader"></div>
        {/* <p className='mt-3 fw-bold' style={{ fontSize: '1.5rem'}}>Fetchng Information.</p> */}
      </div>
    )
  }

  if(isError){
    return (
      <div className='container'>
          
        <form action="" onSubmit={onSubmit}>
          <div className="input-group mt-3 mb-3">
            <label htmlFor="text" className="input-group-text">@</label>
            <input type="text" className="form-control" name='idName' value={idName} placeholder='Github Username' onChange={(e)=>setIdName(e.target.value)}/>
          </div>

          <div className='text-center'>
            <button type='submit' className='btn btn-primary btn-dark m-3'>Fetch Information</button>
            <button type="button" className='btn btn-primary btn-dark m-3' onClick={onReset}>Reset Information</button>
          </div>
        </form>

        <h1 className='text-center m-3'>Can't find the username.</h1>
      </div>
    )
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
          <div className="input-group mt-3 mb-3">
            <label htmlFor="text" className="input-group-text">@</label>
            <input type="text" className="form-control" name='idName' value={idName} placeholder='Github Username' onChange={(e)=>setIdName(e.target.value)}/>
          </div>

          <div className='text-center'>
            <button type='submit' className='btn btn-primary btn-dark m-3'>Fetch Information</button>
            <button type="button" className='btn btn-primary btn-dark m-3' onClick={onReset}>Reset Information</button>
          </div>
        </form>

        
        {(!submitted)
        ?
        <h1 className='text-center m-3'>Please add the Github Username.</h1>
        :
        <div>
          
          <div className='border border-dark mt-3 mb-3 p-3 rounded d-flex justify-content-around'>
                    
          <div className='mt-3 mb-3 '>            
            <h2><u><b>{gitinfo.name}</b></u></h2>
            <p><b>Username : @</b>{gitinfo.login}</p>
            <p><b>Bio :</b> {(!gitinfo.bio) ? 'Missing Bio' : `${gitinfo.bio}`}</p>
            <p><b>Public Repos :</b> {gitinfo.public_repos}</p>
          </div>

          <div className='d-flex justift-content-center align-items-center'>
            <img className="rounded-circle" width="150" height="150" src={userImage} alt="User image here." />  
          </div>
          
        </div>


        <div className="border border-dark mt-3 mb-3 p-3 rounded">
        <h2>Repositories</h2>

          <div className='d-flex flex-wrap justify-content-start'> 
              {sortedGitRepos.map((item)=>{
                return (
                  <div className='m-3 border border-dark p-2 rounded' style={{width:"20rem", overflow: 'auto', }} key={item.id}> 
                    <h2><u><b>{item.name}</b></u></h2>
                    <p><b>Visibility :</b> {(!item.private)? 'Public' : 'Private'}</p>
                    <p><b>Created At :</b> {new Date(item.created_at).toLocaleString("en-US", { timeZone: "America/New_York" })}</p>
                    {/* <p style={{ whiteSpace: 'pre' }}><b>Languages : </b> {Object.keys(item.language).join(` , `)}</p> */}
                    <p style={{ whiteSpace: 'pre' }}><b>Languages :</b> {Object.entries(item.language).map(([key, value], index) => (
                        <span key={key} style={{ paddingLeft: index !== 0 ? '5.6rem' : '0' }}>
                          {`${key}  ( ${((value / Object.values(item.language).reduce((acc, value) => acc + value, 0)) * 100).toFixed(2)} % )`}<br/>
                        </span>
                      ))}
                    </p>
                  </div>                  
                )
              })}
          </div>
        </div>

      <div className='border border-dark p-3 rounded'>
        <h2>Social</h2>

        <p className='mt-4'><u>Followers: {gitinfo.followers}</u></p>

        <div className='d-flex flex-wrap justify-content-start text-center border border-dark p-2 rounded'>
        {followers.map((item)=>{
          return(  
            <div className='m-1' key={item.id}>          
              <img className="rounded-circle mb-3" width="80" height="80" src={`https://avatars.githubusercontent.com/u/${item.id}?v=4`} alt="Follower image here."/>
              <p><b>@</b>{item.login}</p>
            </div>
          )
        })}
        </div>


        <p className='mt-4'><u>Following: {gitinfo.following}</u></p>

        <div className='d-flex flex-wrap justify-content-start text-center border border-dark p-2 rounded'>
        {following.map((item)=>{
          return(  
            <div className='m-1' key={item.id}>          
              <img className="rounded-circle mb-3" width="80" height="80" src={`https://avatars.githubusercontent.com/u/${item.id}?v=4`} alt="Following user image here."/>
              <p><b>@</b>{item.login}</p>
            </div>
          )
        })}
        </div>

      </div>
      </div>
      }

    </div>
  )
}

export default Body