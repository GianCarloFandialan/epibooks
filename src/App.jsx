import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from './Components/MyNav'
import Welcome from './Components/Welcome'
import MyFooter from './Components/MyFooter'
import AllTheBooks from './Components/AllTheBooks'
import history from "./data/history.json";
import fantasy from "./data/fantasy.json";
import horror from "./data/horror.json";
import romance from "./data/romance.json";
import scifi from "./data/scifi.json";
import { Button, ButtonGroup } from 'react-bootstrap'
import { useState } from 'react'
import Context from './Components/Context/Prova'

function App() {

  const [genre, setGenre] = useState(romance);

  const [searchInputData, setSearchInputData] = useState("")

  const handleSearchBar = (data) => {
    setSearchInputData(data);
  }

  const [darkMode, setDarkMode] = useState(false)

  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <>
      <Context.Provider value={ {darkMode, setDarkMode} }>
        <MyNav handleSearchBar={handleSearchBar} searchInputData={searchInputData} handleDarkMode={handleDarkMode}/>
        <Welcome/>

        <ButtonGroup className={ darkMode ? "bg-dark my-3" : "bg-white my-3"}>
          <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(fantasy)}>fantasy</Button>
          <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(history)}>history</Button>
          <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(horror)}>horror</Button>
          <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(romance)}>romance</Button>
          <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(scifi)}>scifi</Button>
        </ButtonGroup>

        
        {genre === romance && <h1>Romance books</h1>}
        {genre === fantasy && <h1>Fantasy books</h1>}
        {genre === history && <h1>History books</h1>}
        {genre === horror && <h1>Horror books</h1>}
        {genre === scifi && <h1>Scifi books</h1>}

        <AllTheBooks searchInputData={searchInputData} genre={genre} />
        <MyFooter/>
      </Context.Provider>
    </>
  )
}

export default App
