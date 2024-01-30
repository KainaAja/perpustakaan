const API_KEY = 'your_api_key';
const API_URL = `https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=${API_KEY}`;
const GET = `https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=your_api_key`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getBooks(API_URL);

async function getBooks(url) {
    const res = await fetch(url);
    const data = await res.json();

    showBooks(data.items);
}

function showBooks(books) {
    main.innerHTML = '';

    books.forEach((book) => {
        const { title, imageLinks, authors, ebooks } = book.volumeInfo;

        const bookEL = document.createElement('div');
        bookEL.classList.add('book');

        bookEL.innerHTML = `       
        <img src="${imageLinks?.thumbnail}" alt="${title}">
        <div class="book-info">
            <h3>${title}</h3>
            <p>Author: ${authors ? authors.join(', ') : 'Unknown'}</p>
        </div>
        <div class="overview">
            <h3>Description</h3>
            ${ebooks && ebooks.length > 0
                ? ebooks.map((ebook) => `<p>${ebook.title} - ${ebook.price}</p>`).join('')
                : 'No additional information available'}
        </div>
        `;

        main.appendChild(bookEL);
    });
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        const SEARCH_API = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&filter=free-ebooks&key=${API_KEY}`;
        getBooks(SEARCH_API);

        search.value = '';
    } else {
        window.location.reload();
    }
});
