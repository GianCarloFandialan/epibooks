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

function App() {

  const [genre, setGenre] = useState(romance);

  console.dir(genre)
  return (
    <>
      <MyNav/>
      <Welcome/>

      <ButtonGroup className="my-3">
        <Button variant="outline-dark" onClick={() => setGenre(fantasy)}>fantasy</Button>
        <Button variant="outline-dark" onClick={() => setGenre(history)}>history</Button>
        <Button variant="outline-dark" onClick={() => setGenre(horror)}>horror</Button>
        <Button variant="outline-dark" onClick={() => setGenre(romance)}>romance</Button>
        <Button variant="outline-dark" onClick={() => setGenre(scifi)}>scifi</Button>
      </ButtonGroup>

      
      {genre === romance && <h1>Romance books</h1>}
      {genre === fantasy && <h1>Fantasy books</h1>}
      {genre === history && <h1>History books</h1>}
      {genre === horror && <h1>Horror books</h1>}
      {genre === scifi && <h1>Scifi books</h1>}

      <AllTheBooks genre={genre}/>
      <MyFooter/>
    </>
  )
}

export default App
