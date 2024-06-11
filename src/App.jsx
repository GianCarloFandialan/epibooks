import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from './Components/MyNav'
import Welcome from './Components/Welcome'
import MyFooter from './Components/MyFooter'
import AllTheBooks from './Components/pages/AllTheBooks'
import history from "./data/history.json";
import fantasy from "./data/fantasy.json";
import horror from "./data/horror.json";
import romance from "./data/romance.json";
import scifi from "./data/scifi.json";
import { Button, ButtonGroup } from 'react-bootstrap'
import { useState } from 'react'
import Context from './Components/Context/Prova'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from './Components/pages/NotFound'
import BookDetails from './Components/pages/BookDetails'

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
    <div className={ darkMode ? "bg-dark g-2" : "bg-white g-2"}>
      <Context.Provider value={ {darkMode, setDarkMode} }>
        <Router>
          <MyNav handleSearchBar={handleSearchBar} searchInputData={searchInputData} handleDarkMode={handleDarkMode}/>

          <Routes>
            <Route 
              path="/" 
              element={          
                <div>
                  <Welcome/>

                  <div className='d-flex justify-content-center'>
                    <ButtonGroup className={ darkMode ? "bg-dark my-3 mx-auto d-flex justify-content-center" : "bg-white my-3 mx-auto"}>
                      <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(fantasy)}>fantasy</Button>
                      <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(history)}>history</Button>
                      <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(horror)}>horror</Button>
                      <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(romance)}>romance</Button>
                      <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => setGenre(scifi)}>scifi</Button>
                    </ButtonGroup>

                  </div>


                  {genre === romance && <h1 className={ darkMode ? "text-white text-center" : "bg-white text-center"}>Romance books</h1>}
                  {genre === fantasy && <h1 className={ darkMode ? "text-white text-center" : "bg-white text-center"}>Fantasy books</h1>}
                  {genre === history && <h1 className={ darkMode ? "text-white text-center" : "bg-white text-center"}>History books</h1>}
                  {genre === horror && <h1 className={ darkMode ? "text-white text-center" : "bg-white text-center"}>Horror books</h1>}
                  {genre === scifi && <h1 className={ darkMode ? "text-white text-center" : "bg-white text-center"}>Scifi books</h1>}

                  <AllTheBooks searchInputData={searchInputData} genre={genre} />
                </div>
              } 
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/:asin" element={<BookDetails />}/>
          </Routes>

          <MyFooter/>
        </Router>
      </Context.Provider>
    </div>
  )
}

export default App
