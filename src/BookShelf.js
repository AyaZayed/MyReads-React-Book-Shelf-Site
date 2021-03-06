import React, { Component } from "react";
import PropTypes from "prop-types";

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelves: PropTypes.func,
  };

  render() {
    const { books, onUpdateShelves } = this.props;
    return (
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${
                      book.imageLinks && book.imageLinks.thumbnail
                        ? book.imageLinks.thumbnail
                        : ""
                    })`,
                  }}
                />
                <div className="book-shelf-changer">
                  <select
                    defaultValue={book.shelf || "none"}
                    onChange={(event) =>
                      onUpdateShelves(book, event.target.value)
                    }
                  >
                    <option disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">
                {book.title ? book.title : "This book has no title"}
              </div>
              <div className="book-authors">
                {book.authors
                  ? book.authors.join(", ")
                  : "This book has no author"}
              </div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

export default BookShelf;
