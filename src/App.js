import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import { Route, Link } from "react-router-dom";
import "./App.css";
import BookShelf from "./BookShelf";
import SearchBooks from "./SearchBooks";

class BooksApp extends Component {
  constructor() {
    super();
    this.updateBooks = this.updateBooks.bind(this);
  }

  state = {
    books: []
  };

  componentDidMount() {
    this.updateBooks();
  }

  updateBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => <SearchBooks books={this.state.books} />}
        />
        <Route
          exact
          path="/"
          render={({ history }) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    title="Currenty Reading"
                    books={this.state.books}
                    shelf="currentlyReading"
                    updateBooks={this.updateBooks}
                  />
                  <BookShelf
                    title="Want To Read"
                    books={this.state.books}
                    shelf="wantToRead"
                    updateBooks={this.updateBooks}
                  />

                  <BookShelf
                    title="Read"
                    books={this.state.books}
                    shelf="read"
                    updateBooks={this.updateBooks}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
