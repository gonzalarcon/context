import "../assets/css/galeria.css";
import Heart from "./Heart";
import { useContext } from "react";
import MyContext from "../mycontext";

export default function Home() {
const {gallery, fav, setFav, like, setLike} = useContext(MyContext);
const addFav = (photo) =>{
  if (!fav.find((favPhoto) => favPhoto.id === photo.id)){
    setFav([...fav, photo]);
  }
  else{
    let favoritos = fav.filter(photoFav => photoFav.id !== photo.id )
    setFav(favoritos);
  }
  setLike(
    {
      ...like,
      [photo.id] : !like[photo.id]
    }
  )
}

  return (
    <div className="galeria grid-columns-5 p-3">
      {
        gallery?.map(photo => (
          <div key={photo.id} className='foto' onClick={() => addFav(photo)} style={{backgroundImage:`url(${photo.src.tiny})`}}>
          <Heart filled={like[photo.id]}/>
          <p className="svg">{photo.alt}</p>
          </div>
        ))
      }
    </div>
  );
}