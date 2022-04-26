import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";

class Search extends Component {
  state = {
    query: "",
    showingBooks: [],
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
    }));
    setTimeout(() => {
      BooksAPI.search(query).then((queryBooks) => {
        if (query === "" || !Array.isArray(queryBooks)) {
          this.setState({
            showingBooks: [],
          });
        } else {
          const updatedBooks = queryBooks.map((book) => {
            const propsBooks = this.props.books.find((b) => b.id === book.id);
            if (propsBooks) {
              book.shelf = propsBooks.shelf;
            }
            return book;
          });
          this.setState({
            showingBooks: updatedBooks,
          });
        }
      }, 300);
    });
  };

  render() {
    const { query, showingBooks } = this.state;
    const { onUpdateShelves } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Search Books
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div>
          {this.state.showingBooks.length > 0 &&
            this.state.query.length > 1 && (
              <BookShelf
                books={showingBooks}
                onUpdateShelves={onUpdateShelves}
              />
            )}
        </div>
      </div>
    );
  }
}

export default Search;
