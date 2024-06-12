//IMPORTO GLI HOOK DI REACT
import { useContext } from "react";
//IMPORTO UN COMPONENTE DI REACT ROUTER DOM
import { Link } from "react-router-dom";
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from '../modules/Darkmode';

//MI CREO LA PAGINA DI ERRORE NEL CASO L'UTENTE NAVIGHI SU UNA ROTTA NON GESTITA
function NotFound() {

  //MI "PRENDO" LA DARKMODE
  const { darkMode } = useContext(Context);

  //STILIZZO IN BASE ALLA DARKMODE  
  return (
    <div style={{height:"80vh"}} className="d-flex align-items-center justify-content-center flex-column">
      <h1 className={darkMode ? "fw-bold text-white" : "fw-bold"} style={{fontSize:"10vw"}}>404 NOT FOUND</h1>
      <p className={darkMode ? "fw-bold text-white fs-3" : "fw-bold fs-3"}>Go back to <Link to="/">Home</Link></p>
    </div>
    
  )
}

export default NotFound;