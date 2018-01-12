import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import { Route, Link, Switch } from "react-router-dom";
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
    const FourOhFour = () => <p>Nothing to see here.</p>;
    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={() => (
              <SearchBooks
                books={this.state.books}
                updateBooks={this.updateBooks}
              />
            )}
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
                  <BookShelf
                    title="Currenty Reading"
                    books={this.state.books.filter(
                      book => "currentlyReading" === book.shelf
                    )}
                    updateBooks={this.updateBooks}
                  />

                  <BookShelf
                    title="Want To Read"
                    books={this.state.books.filter(
                      book => "wantToRead" === book.shelf
                    )}
                    updateBooks={this.updateBooks}
                  />

                  <BookShelf
                    title="Read"
                    books={this.state.books.filter(
                      book => "read" === book.shelf
                    )}
                    updateBooks={this.updateBooks}
                  />
                </div>

                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}
          />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
