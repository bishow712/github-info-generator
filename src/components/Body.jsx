import {useSelector, useDispatch} from 'react-redux'
import { fetchInfo, fetchRepo } from '../features/github/githubSlice'
// import githubSlice from '../features/github/githubSlice'
import { useState } from 'react'
// import { Carousel } from 'react-bootstrap';

function Body() {
  const [idName, setIdName] = useState('')

  const dispatch = useDispatch()

  const {gitinfo, gitrepo, isLoading, isError, message} = useSelector((state) => {
    return state.github
  })

  const onSubmit = (e) =>{
    e.preventDefault()
    dispatch(fetchInfo(idName))
    dispatch(fetchRepo(idName))
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
            <label htmlFor="text" class="input-group-text">@ Username</label>
            <input type="text" class="form-control" name='idName' value={idName} placeholder='Enter your Github username here.' onChange={(e)=>setIdName(e.target.value)}/>
          </div>

          <div className='text-center'>
            <button type='submit' className='btn btn-primary'>Fetch Information</button>
          </div>
        </form>

        <div className='mt-3 mb-3'>
          <img className="rounded-circle" width="150" height="150" src={userImage} alt="User image here." />
          <h2>{gitinfo.name}</h2>
          <p>Bio: {(!gitinfo.bio) ? 'Bio Missing.' : `${gitinfo.bio}`}</p>
        </div>

        <div className=''> 
          <h2>Repositories</h2>
          {/* <Carousel> */}
            {sortedGitRepos.map((item)=>{
              return (
                // <Carousel.Item key={item.id}>
                <div key={item.id} className='card border-dark mt-3 mb-3' style={{maxWidth: "30rem"}}>
                  <div class="text-center card-header"><h2>{item.name}</h2></div>
                    <div class="card-body">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item"><b>Visibility :</b> {(!item.private)? 'Public' : 'Private'}</li>
                        <li class="list-group-item"><b>Created At :</b> {new Date(item.created_at).toLocaleString("en-US", { timeZone: "America/New_York" })}</li>
                        <li class="list-group-item">A third item</li>
                      </ul>
                    </div>
                </div>
                // </Carousel.Item>
              )
            })}
          {/* </Carousel> */}
      </div>

      <div>
        <h2>Social</h2>
        <p>Followers: {gitinfo.followers}</p>
        <p>Following: {gitinfo.following}</p>


      </div>
    </div>
  )
}

export default Body