//IMPORTO GLI HOOK DI REACT
import { useContext } from 'react';
//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import Alert from 'react-bootstrap/Alert';
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from './Context/Darkmode';

function Welcome() {

  //MI "PRENDO" LA DARKMODE
  const { darkMode } = useContext(Context);

  //STILIZZO IN BASE ALLA DARKMODE
  return (
    <div className='d-flex justify-content-center'>
        <Alert variant={darkMode ? "dark text-center mt-3 w-75" : "light text-center mt-3 w-75"}>
          Welcome to EpiBook
        </Alert>
    </div>
  );
}

export default Welcome;