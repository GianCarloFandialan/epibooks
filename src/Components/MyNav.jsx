import { useContext, useState } from 'react';
import { Form, Container, Nav, Navbar } from 'react-bootstrap';
import Context from './Context/Prova';

function MyNav( {handleSearchBar, searchInputData, handleDarkMode} ) {

  const { darkMode } = useContext(Context);

  function handleChange(e) {
    const { value } = e.target;
    handleSearchBar(value)
  }

  return (
    <Navbar expand="lg" bg={darkMode ? "dark" : "light"} data-bs-theme={darkMode ? "dark" : "light"} >
      <Container>
        <Navbar.Brand href="#home">EpicBooks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Form.Control
              type="text"
              name="search"
              placeholder="Search"
              value = {searchInputData}
              onChange={handleChange}
            />
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#browse">Browse</Nav.Link>            
          </Nav>
        </Navbar.Collapse>

        <Form.Check
        type="switch"
        id="custom-switch"
        label="Dark Mode"
        onChange={handleDarkMode}
        className={darkMode ? "text-light" : "text-black"}
      />
      </Container>
    </Navbar>
  );
}

export default MyNav;