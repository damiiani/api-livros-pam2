const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');

const books = require('./books.json');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/books', (req, res) => {
  const { title } = req.query;

  const out = title ? books.filter((book) => book.title.includes(title)) : books;

  return res.json(out);
});

app.post('/books', (req, res) => {
  const {
    title, desc, author, releaseDate,
  } = req.body;

  const book = {
    id: uuid(), title, desc, author, releaseDate,
  };

  books.push(book);

  return res.json(book);
});

app.put('/books', (req, res) => {
  const {
    id, title, desc, author, releaseDate,
  } = req.body;

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex < 0) {
    return res.status(400).json({ error: 'Livro não encontrado.' });
  }

  const book = {
    id, title, desc, author, releaseDate,
  };

  books[bookIndex] = book;

  return res.json(req.params);
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;

  const bookIndex = books.findIndex((book) => book.id === Number(id));

  if (bookIndex < 0) {
    return res.status(400).json({ error: 'Livro não encontrado.' });
  }

  books.splice(bookIndex, 1);

  return res.status(204).json();
});

app.listen(4000, () => console.log('Servidor online na porta 4000'));
