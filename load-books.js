const loadButton = document.getElementById('load-button')
const submitForm = document.getElementById('add-form')

const saveBook = (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const author = document.getElementById('author').value;
  const price = document.getElementById('price').value;

  fetch('http://localhost:3000/book', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, author: author, price: price })
  }).then((res) => res.json())
  .then((data) => {
    submitForm.reset();
    alert(`Книга ${data.name} добавлена`);
  })
  .catch((err) => alert('Ошибка', err))
}

const loadBooks = () => {
  fetch('http://localhost:3000/books')
    .then((res) => res.json())
    .then((data) => {
      let renderBooks;

      if (data.length === 0) {
        renderBooks = `<div class="empty-books">Книг не найдено</div>`
      } else {
        renderBooks = data.map(book => {
          return `<div class="book-item">
            <div class="book-title">${book.name}</div>
            <div class="book-author">${book.author}</div>
            <div class="book-price">${book.price}</div>
          </div>`
        }).join('')
      }

      document.getElementById('books').innerHTML = '';
      document.getElementById('books').innerHTML = renderBooks;
  }).catch((err) => console.log(err))
}

submitForm.addEventListener('submit', saveBook);

loadButton.addEventListener('click', () => loadBooks())