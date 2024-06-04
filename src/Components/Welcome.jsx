import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import Context from './Context/Prova';

function Welcome() {

  const { darkMode } = useContext(Context);

  return (
    <>
        <Alert variant={darkMode ? "dark" : "light"} className='my-4'>
          Welcome to EpiBook
        </Alert>
    </>
  );
}

export default Welcome;