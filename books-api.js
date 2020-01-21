const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let books = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
  const book = req.body;
  books.push(book);
  console.log('Book is added')

  return res.json(book)
});

app.get('/books', (req, res) => res.json(books))

app.listen(port, () => console.log(`My app listening on port ${port}!`))