const express = require('express');

const books = require('./books.json');

const app = express();

app.use(express.json());

app.get('/books', (req, res) => {
  const { author } = req.query;

  if (author) {
    res.send(books.filter((book) => {
      return book.author === author;
    }));
  }

  res.json(books);
});

app.post('/books', (req, res) => {
  const {
    id, title, desc, author, releaseDate,
  } = req.body;

  const book = {
    id, title, desc, author, releaseDate,
  };

  res.json(book);
});

app.put('/books/:id', (req, res) => {
  res.json(req.params);
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;

  res.json({ id });
});

app.listen(4000, () => console.log('Servidor online na porta 4000'));
