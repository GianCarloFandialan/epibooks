import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import Context from './Context/Prova';

function Welcome() {

  const { darkMode } = useContext(Context);

  return (
    <div className='d-flex justify-content-center'>
        <Alert variant={darkMode ? "dark text-center mt-3 w-75" : "light text-center mt-3 w-75"}>
          Welcome to EpiBook
        </Alert>
    </div>
  );
}

export default Welcome;