import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Main from "./Main";
import Search from "./Search";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  removeBook = (book, shelf) => {
    this.setState((currentState) => ({
      books: currentState.books.filter((b) => {
        return b.id !== book.id;
      }),
    }));
    BooksAPI.update(book, shelf);
  };

  updateShelves = (book, shelf) => {
    if (shelf === "none") {
      this.removeBook(book, shelf);
    } else {
      BooksAPI.update(book, shelf).then(() => {
        this.setState((currentState) => ({
          books: currentState.books.map((b) =>
            b.id === book.id ? { ...b, shelf: shelf } : b
          ),
        }));
      });
    }
  };

  addBookToShelf = (book, shelf) => {
    book.shelf = shelf;
    let foundBook = this.state.books.find((b) => b["id"] === book.id);
    let bk = this.state.books;
    if (!foundBook) {
      this.setState({ books: bk.concat(book) });
      this.updateShelves(book, shelf);
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Main
              books={this.state.books}
              onUpdateShelves={this.updateShelves}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              books={this.state.books}
              onUpdateShelves={this.addBookToShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
