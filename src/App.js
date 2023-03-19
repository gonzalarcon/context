import "./styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

import Home from "./views/Home";
import Favoritos from "./views/Favoritos";
import MyContext from "./mycontext";

export default function App() {
  const endpoint = './fotos.json';
  const [fav, setFav] = useState ([]);
  const [gallery, setGallery] = useState ([]);
  const [like, setLike] = useState ([]);
  const globalState = {gallery, setGallery, fav, setFav, like, setLike};

  const importData = async () => {
    const response = await fetch(endpoint);
    const photos = await response.json();
    const arrayPhotos = photos.photos;
    setGallery(viewGallery => [...arrayPhotos]);
  } 
  useEffect(()=>{
    importData()
  }, []);


  return (
      <div className="App">
        <MyContext.Provider value={globalState}>        
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favoritos" element={<Favoritos />} />
            </Routes>
          </BrowserRouter>
        </MyContext.Provider>
      </div>
  
  );
}
