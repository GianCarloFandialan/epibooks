//IMPORTO GLI HOOK DI REACT
import { useContext, useState } from 'react';
//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import { Form, Container, Nav, Navbar } from 'react-bootstrap';
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from './modules/Darkmode';
//IMPORTO UN COMPONENTE DI REACT ROUTER DOM
import { Link, NavLink } from 'react-router-dom';

function MyNav( {handleSearchBar, searchInputData, handleDarkMode} ) {

  //MI "PRENDO" LA DARKMODE
  const { darkMode } = useContext(Context);

  //CREO UNA FUNZIONE PER POTER GESTIRE IL VALORE DI INPUT DELLA SEARCCHBAR E ANCHE PER GESTIRE LO STATO IN APP
  function handleChange(e) {
    const { value } = e.target;
    handleSearchBar(value)
  }

  //STILIZZO IN BASE ALLA DARKMODE
  return (
    <Navbar expand="lg" className={darkMode ? "bg-black" : "chiaroComponenti"} data-bs-theme={darkMode ? "dark" : "light"} >
      <Container fluid>
        <Link to="/" className='link-underline link-underline-opacity-0'>
          <Navbar.Brand>EpicBooks</Navbar.Brand>
        </Link>
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

        {/* IN QUESTO FORM VADO A GESTIRE LA FUNZIONALITA CHE MI PERMETTE DI GESTIRE LA DARKMODE PASSATA A QUESTO COMPONENTE COME PROP */}
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