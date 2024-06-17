import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { expect, test } from 'vitest';

test("Verifica che il componente Welcome venga montato correttamente", () => {
  render(<App />);
  const welcomeComponent = screen.getByTestId("welcome");
  expect(welcomeComponent).toBeInTheDocument();
});


test("Verifica che vengano effettivamente renderizzate tante bootstrap cards quanti sono i libri nel file json utilizzato", () => {
  render(<App />);
  const cards = screen.getAllByTestId("book-card");
  console.log(cards);
  expect(cards).toHaveLength(150)
})

test("Verifica che il componente CommentArea venga renderizzato correttamente", () => {
  render(<App />);
  const CommentArea = screen.getByText("Comment here");
  expect(CommentArea).toBeInTheDocument();
})

test('(1)Verifica, magari con più tests, che il filtraggio dei libri tramite navbar si comporti come previsto', () => { 
  render(<App />);
  const Searchbar = screen.getByPlaceholderText("Search");
  fireEvent.change(Searchbar, { target: { value:"wil"}})
  const filteredCards = screen.getAllByTestId("book-card");
  expect(filteredCards).toHaveLength(3)
})

test('(2)Verifica, magari con più tests, che il filtraggio dei libri tramite navbar si comporti come previsto', () => { 
  render(<App />);
  const Searchbar = screen.getByPlaceholderText("Search");
  fireEvent.change(Searchbar, { target: { value:"star wars"}})
  const filteredCards = screen.getAllByTestId("book-card");
  expect(filteredCards).toHaveLength(3)
})

test('Verifica che, cliccando su un libro, il suo bordo cambi colore', () => {
  render(<App />);
  const card = screen.getByAltText("1597808709");
  fireEvent.click(card);
  expect(card).toHaveClass('border-success')
})

test('Verifica che, cliccando su di un secondo libro dopo il primo, il bordo del primo libro ritorni normale', () => {
  render(<App />);
  const primaCard = screen.getByAltText("1597808709");
  fireEvent.click(primaCard);
  expect(primaCard).toHaveClass('border-success');
  const secondaCard = screen.getByAltText("1578562953");
  fireEvent.click(secondaCard);
  expect(secondaCard).toHaveClass('border-success');
  expect(primaCard).toHaveClass('border-danger');
})

test("Verifica che all'avvio della pagina, senza aver ancora cliccato su nessun libro, non ci siano istanze del componente SingleComment all'interno del DOM", () => {
  render(<App />);
  const comment = screen.getByTestId("comments-container").querySelector(".book-comment");
  expect(comment).not.toBeInTheDocument()
})


test("Verifica infine che, cliccando su di un libro con recensioni, esse vengano caricate correttamente all'interno del DOM.", async () => {
  render(<App />);
  const primaCard = screen.getByAltText("1597808709");
  fireEvent.click(primaCard);
  await waitFor(() => {
    expect(screen.getByTestId("comments-container").querySelector(".book-comment")).toBeInTheDocument
  })
})