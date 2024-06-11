//IMPORTO IL CSS PER APP E IL CSS DI BOOTSTRAP
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//IMPORTO I VARI COMPONENTI
import NotFound from './Components/pages/NotFound'
import BookDetails from './Components/pages/BookDetails'
import MyNav from './Components/MyNav'
import Welcome from './Components/Welcome'
import MyFooter from './Components/MyFooter'
import AllTheBooks from './Components/pages/AllTheBooks'
import Context from './Components/Context/Darkmode'
//IMPORTO I VARI FILE JSON CONTENTI I GENERI ED I LORO LIBRI
import history from "./data/history.json";
import fantasy from "./data/fantasy.json";
import horror from "./data/horror.json";
import romance from "./data/romance.json";
import scifi from "./data/scifi.json";
//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import { Button, ButtonGroup } from 'react-bootstrap'
//IMPORTO GLI HOOK DI REACT
import { useState } from 'react'
//IMPORTO GLI HOOK E I COMPONENTI DI REACT ROUTER DOM
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'



function App() {

  //CREO LO STATO IN CUI VIENE CONTENUTO IL GENERE CHE POI ANDRA IN "ALLTHEBOOKS"
  const [genre, setGenre] = useState(romance);

  //CREO LO STATO IN CUI VIENE "SALVATO" IL VALORE DI INPUT INSERITO NELLA SEARCH BAR
  const [searchInputData, setSearchInputData] = useState("")

  //CREO UNA FUNZIONE CHE VERRA PASSATA COME PROP ALLA SEARCH BAR PER DARGLI LA POSSIBILITA DI MODIFICARE LO STATO
  const handleSearchBar = (data) => {
    setSearchInputData(data);
  }

  //CREO LO STATO IN CUI VIENE "SALVATA" LA DARK MODE
  const [darkMode, setDarkMode] = useState(false)

  //CREO LA FUNZIONE PER GESTIRE LA DARKMODE CHE ANDRO POI A PASSARE COME PROP AD UNO SWITCH PER POTERLA MODIFCIARE
  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    //AVVOLGO TUTTO IN UN DIV SOLO PER POTER MODIFICARE IL COLORE DI BACKGOUND IN BASE ALLA DARK MODE
    <div className={ darkMode ? "bg-dark g-2" : "bg-secondary-subtle g-2"}>

      {/* AVVOLGO TUTTO NEL CONTEXT PROVIDER IN MODO TALE DA POTERLO USARE */}
      <Context.Provider value={ {darkMode, setDarkMode} }>

        <Router>
          {/* INSERISCO LA NAVBAR E GLI PASSO COME PROPS LA FUNZIONE PER GESTIRE LA SEARCHBAR E LA DARKMODE*/}
          <MyNav handleSearchBar={handleSearchBar} searchInputData={searchInputData} handleDarkMode={handleDarkMode}/>

          {/* INSERISCO LE ROUTES */}
          <Routes>
            <Route 
              path="/" 
              element={          
                <div>
                  {/* IL COMPONENTE WELCOME CONTENTE L'ALERT */}
                  <Welcome/>

                  {/* CREO UNA SERIE DI BOTTONI CHE AL LORO CLICK CAMBIANO IL GENERE DEI LIBRIE DI CONSEGUENZA QUELLI RENDERIZZATI A PAGINA */}
                  <div className='d-flex justify-content-center'>
                    <ButtonGroup className={ darkMode ? "bg-dark my-3 mx-auto d-flex justify-content-center" : "bg-white my-3 mx-auto"}>
                      <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(fantasy)}>fantasy</Button>
                      <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(history)}>history</Button>
                      <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(horror)}>horror</Button>
                      <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(romance)}>romance</Button>
                      <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(scifi)}>scifi</Button>
                    </ButtonGroup>
                  </div>

                  {/* CAMBIO IL TITOLO DELLA PAGINA INDICANTE IL GENERE IN BASE AL GENERE SELEZIONATO */}
                  {genre === romance && <h1 className={ darkMode ? "text-white text-center" : "bg-secondary-subtle text-center"}>Romance books</h1>}
                  {genre === fantasy && <h1 className={ darkMode ? "text-white text-center" : "bg-secondary-subtle text-center"}>Fantasy books</h1>}
                  {genre === history && <h1 className={ darkMode ? "text-white text-center" : "bg-secondary-subtle text-center"}>History books</h1>}
                  {genre === horror && <h1 className={ darkMode ? "text-white text-center" : "bg-secondary-subtle text-center"}>Horror books</h1>}
                  {genre === scifi && <h1 className={ darkMode ? "text-white text-center" : "bg-secondary-subtle text-center"}>Scifi books</h1>}

                  {/* COMPONENTE CONTENTE TUTTI I LIBRI, GLI PASSO COME PROPRIETA IL RISULTATO DELLA BARRA DI RICERCA IN MODO TALE DA FILTRARE I LIBRI ED IL GENERE ANCHE QUESTO PER RENDERIZZALI */}
                  <AllTheBooks searchInputData={searchInputData} genre={genre} />
                </div>
              } 
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/:asin" element={<BookDetails />}/>
          </Routes>

          <MyFooter/>
          {/* INSERISCO IL FOOTER */}
        </Router>
      </Context.Provider>
    </div>
  )
}

export default App
