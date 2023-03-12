import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

function Main(props) {
  const { books, onUpdateShelves } = props;

  const currentlyReadingBooks = books.filter(
    (book) => book.shelf === "currentlyReading"
  );
  const wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
  const readBooks = books.filter((book) => book.shelf === "read");
  const shelves = [
    { title: "Currently Reading", key: currentlyReadingBooks },
    { title: "Want To Read", key: wantToReadBooks },
    { title: "Read", key: readBooks },
  ];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelves.map((shelf) => (
          <div className="bookshelf" key={shelf.title}>
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
              <BookShelf books={shelf.key} onUpdateShelves={onUpdateShelves} />
            </div>
          </div>
        ))}
      </div>
      <div className="open-search">
        <Link id="add-button" to="/search" className="search-books">
          Search Books
        </Link>
      </div>
    </div>
  );
}

export default Main;
