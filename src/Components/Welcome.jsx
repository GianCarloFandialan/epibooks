import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import Context from './Context/Prova';

function Welcome() {

  const { darkMode } = useContext(Context);

  return (
    <>
        <Alert variant={darkMode ? "dark" : "light"}>
          Welcome to EpiBook
        </Alert>
    </>
  );
}

export default Welcome;