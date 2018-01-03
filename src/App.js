import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import { Route, Link } from "react-router-dom";
import "./App.css";
import BookShelf from "./BookShelf";
import SearchBooks from "./SearchBooks";

class BooksApp extends Component {
  state = {
    books: []
  };

  componentDidMount() {
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
                  />
                  <BookShelf
                    title="Want To Read"
                    books={this.state.books}
                    shelf="wantToRead"
                  />

                  <BookShelf
                    title="Read"
                    books={this.state.books}
                    shelf="read"
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
