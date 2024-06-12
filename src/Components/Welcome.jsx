//IMPORTO GLI HOOK DI REACT
import { useContext } from 'react';
//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import Alert from 'react-bootstrap/Alert';
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from './modules/Darkmode';

function Welcome() {

  //MI "PRENDO" LA DARKMODE
  const { darkMode } = useContext(Context);

  //STILIZZO IN BASE ALLA DARKMODE
  return (
    <div className='d-flex justify-content-center'>
        <Alert variant={darkMode ? "dark text-center mt-3 w-75 fw-bold" : "light text-center mt-3 w-75 fw-bold"}>
          Welcome to EpiBook
        </Alert>
    </div>
  );
}

export default Welcome;