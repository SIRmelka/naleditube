import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [videos,setVideos] = useState([])
  const [playing, setPlaying] = useState(false)
  const [curent,setCurent] = useState()
  const [load,setLoad] = useState(false)

  function loader()
  {
    setLoad(true)
    setTimeout(()=>{
      setLoad(false)
    },1000)
  }


  function play(id){
    setPlaying(true)
    setCurent(id)
    loader()
  }

  function close(){
    setPlaying(false)
  }
 
  useEffect(()=>{
  fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=${'AIzaSyBcmpg139M76uLEwEGzUITthPA0Ctcnuyw'}`)
  .then((data)=>data.json())
  .then(res=> {
    setVideos(res.items)
  })
  .catch((err)=>{
    console.log("error",err);
  })
  },[])
  
console.log(videos);
  return (
    <>
    <div className='navbar'>
              <h2>Naledi</h2>
              <div className=''>Logout</div>
            </div>
    <div className="App">
      
      {
        videos.map((video)=>{
          return(
            <>
            
            <div id={video.id} className='video-card' onClick={()=>play(video.id)}>
              <div className='card-image' style={{backgroundImage:`url(${video.snippet.thumbnails.high.url})`}}></div>
              <div className='card-content'>
                <div className='about'>
                  <p className='title'>
                    {video.snippet.title}
                  </p>
                  <p className='views'> {video.snippet.categoryId}K</p>
                </div>
                <div className='play'> <img className='icon' src="https://www.un.org/sites/un2.un.org/files/2021/04/play-button.png"></img></div>
              </div>
            </div>
            </>
          )
        })
      }
    
    </div>
      {
        playing?
        <div className='frame'>
      <div className='video'>
        {
          load?
          <div className='loader'>
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>:""
        }
       

      <iframe src={`https://www.youtube.com/embed/${curent}`}>
      </iframe>
      </div>
      <div className='close' onClick={()=>close()}>
        X
      </div>

    </div>:""
      }
    
    
    </>
  );
}

export default App;
