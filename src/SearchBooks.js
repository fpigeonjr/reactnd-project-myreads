import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBooks: PropTypes.func.isRequired
  };

  state = {
    searchBooks: [],
    booksFromShelf: [],
    query: ""
  };

  addBookshelfData = searchBooks => {
    searchBooks.map(book => {
      let haveEqualId = shelfData => shelfData.id === book.id;
      let bookDataWithEqualId = this.props.books.find(haveEqualId);
      return Object.assign({}, book, bookDataWithEqualId);
    });
  };

  handleChange = event => {
    this.setState({ query: event.target.value }, () => {
      BooksAPI.search(this.state.query)
        .then(searchBooks => {
          this.setState({ searchBooks });
        })
        .catch(this.setState({ searchBooks: [] }));
    });
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };

  render() {
    let { searchBooks } = this.state;
    if (searchBooks.length) {
      // combine search results with books state data if they match by id
      var booksWithShelfData = searchBooks.map(book => {
        let haveEqualId = shelfData => shelfData.id === book.id;
        let bookDataWithEqualId = this.props.books.find(haveEqualId);
        return Object.assign({}, book, bookDataWithEqualId);
      });
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
              */}

            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchBooks &&
              searchBooks.length > 0 &&
              booksWithShelfData.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  updateBooks={this.props.updateBooks}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
