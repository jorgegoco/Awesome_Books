let books = JSON.parse(localStorage.getItem('booksData')) || [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBook(title, author) {
  const newBook = new Book(title, author);
  books.push(newBook);
}

function removeBook(title, author) {
  books = books.filter((book) => book.title !== title || book.author !== author);
}

const bookList = document.querySelector('.book-list');

function reLoad() {
  bookList.replaceChildren();
  for (let i = 0; i < books.length; i += 1) {
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode(`${books[i].title}`);
    h2.appendChild(h2Text);
    bookList.appendChild(h2);
    const h3 = document.createElement('h3');
    const h3Text = document.createTextNode(`${books[i].author}`);
    h3.appendChild(h3Text);
    bookList.appendChild(h3);
    const button = document.createElement('button');
    button.className = 'button';
    button.id = `button${i}`;
    const buttonText = document.createTextNode('Remove');
    button.appendChild(buttonText);
    bookList.appendChild(button);
    const hr = document.createElement('hr');
    bookList.appendChild(hr);
  }
  const allButtons = Array.from(document.querySelectorAll('.button'));
  allButtons.forEach((allButton) => {
    allButton.addEventListener('click', () => {
      let iButton = allButton.id;
      iButton = Number(iButton.replace(/\D/g, ''));
      const { title } = books[iButton];
      const { author } = books[iButton];
      removeBook(title, author);
      localStorage.setItem('booksData', JSON.stringify(books));
      reLoad();
    });
  });
}
reLoad();
const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = form.elements[0].value;
  const author = form.elements[1].value;
  addBook(title, author);
  localStorage.setItem('booksData', JSON.stringify(books));
  form.reset();
  reLoad();
});