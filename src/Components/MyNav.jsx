import { useContext, useState } from 'react';
import { Form, Container, Nav, Navbar } from 'react-bootstrap';
import Context from './Context/Prova';
import { NavLink } from 'react-router-dom';

function MyNav( {handleSearchBar, searchInputData, handleDarkMode} ) {

  const { darkMode } = useContext(Context);

  function handleChange(e) {
    const { value } = e.target;
    handleSearchBar(value)
  }

  return (
    <Navbar expand="lg" bg={darkMode ? "black" : "light"} data-bs-theme={darkMode ? "dark" : "light"} >
      <Container fluid>
        <Navbar.Brand href="#home">EpicBooks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex align-items-center">
            <Form.Control
              type="text"
              name="search"
              placeholder="Search"
              value = {searchInputData}
              onChange={handleChange}
            />
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink className="nav-link">About</NavLink>
            <NavLink className="nav-link">Browse</NavLink>            
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