import { useEffect, useState } from 'react';
import styled from 'styled-components';
import search from './img/search.svg';
import download from './img/download.svg';

// API 
const accessKey = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const baseLink = `https://api.unsplash.com/photos/`;
const searchLink = `https://api.unsplash.com/search/photos`;

function App() {

  // Membuat state yang diperlukan
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState([1]);
  const [searchQuery, setSearchQuery] = useState('');

  // Get images sesuai request api
  const getImages = async () => {
    let url;
    const pageCount = `&page=${page}`;
    const query = `&query=${searchQuery}`;

    // Check jika terdapat suatu keyword di query
    if (searchQuery) {
      url = `${searchLink}${accessKey}${pageCount}${query}`;
    } else {
      url = `${baseLink}${accessKey}${pageCount}`;
    }

    try {
      const res = await fetch(url);
      const data = res.json().then((allPhotos) => setPhotos((oldPhotos) => {
        // console.log(allPhotos)
        if (searchQuery && page === 1) {
          return allPhotos.results;
        }
        else if (searchQuery) {
          return [...oldPhotos, ...allPhotos.results];
        } else {
          return [...oldPhotos, ...allPhotos];
        }
      })  )

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getImages();
  }, [page])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {

      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 5) {
        setPage((oldValue) => {
          return oldValue + 1;
        })
      } 
    })

      return () => window.removeEventListener('scroll', event);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchQuery) {
      setPage(1);
      getImages();
    }
  }

  const FormRender = () => {
    return (
      <form action="" className='form'>
        <div class="input-control">
          <input type="text" placeholder='Cari Gambar...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button type='submit' onClick={handleSubmit}><img src={search} alt="search" /></button>
        </div>
      </form>
    )
  }

  const GeneratedImages = () => {
    {
      return <div class="content">
        {
          photos.map((photo, i) => {
            return <div class="photo" key={i}>
              <div class="picture">
                <img src={photo.urls.regular} alt="picture" />
              </div>
              <div class="details">
                <p>{photo.user.name}</p>
                <a href={photo.urls.regular}>
                  <img src={download} alt="download" />
                </a>
              </div>
            </div>
          })
        }
      </div>
    }
  }

  return (
    <AppStyled>
      <header className='header'>
        <h2 className='logo'>Photo Booth</h2>
      {FormRender()}
      </header>
      <main className='main-content'>
        {
          GeneratedImages()
        }
      </main>

    </AppStyled>
    
  );
}

const AppStyled = styled.div`
  header{
    height: 30vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #25354C;
    margin-bottom: 2rem;
    

    form{
      display: flex;
      justify-content: center;
      width: 50%;
      transition: all .4s ease-in-out;
      @media screen and (max-width:575px){
        width: 90%;
      }

      .input-control{
        position: relative;
        width: 70%;
        margin: 0 auto;
        text-align: center;
        transition: all .4s ease-in-out;
        @media screen and (max-width: 1064px){
          width: 80%;
        }
        @media screen and (max-width:852px){
          width: 90%;
        }
        @media screen and (max-width:695px){
          width: 95%;
        }
        input{
          padding: 1rem 1rem;
          margin-bottom: 2rem;
          background-color: #4f6877;
          outline: none;
          border: none;
          border-radius: 50px;
          filter: drop-shadow(0px 4px 22px rgba(0,0,0,0.25));
          width: 100%;
          height: 40px;
          color: white;
          font-family: inherit;
          font-size: 12px;
        }
     

        button{
          position: absolute;
          right: 5px;
          top: 50%;
          width: 40px;
          height: 40px;
          outline: none;
          border: none;
          transform: translate(5px, -90%);
          border-radius: 100%;
          background-color: #27A798;
          transition: 0.3s;
        }
        button:hover{
          background-color: #154F48;
          cursor: pointer;
        }

        button img{
          height: 18px;
          width: 18px;
          align-items: center;
          margin: 0 auto;
        }
      }
    }
  }

  .content{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 2rem;
    grid-auto-rows: 1fr;
    width: 90%;
    margin: 0 auto;
    padding-bottom: 3rem;
    .photo{
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      background-color: #25354C;
      box-shadow: 1px 8px 23px rgba(0,0,0,0.25);
      border-radius: 16px;

      
      .picture{
        flex: 2;

        img{
          width: 100%;
          object-fit: cover;
          height: 100%;
          border-radius: 16px;

      
        }
      }

      .details{
        color: white;
        display: flex;
        justify-content: space-between;
        padding-top: 1rem;
        img{
          width: 30px;

        }
      }
    }
  }

`;

export default App;
