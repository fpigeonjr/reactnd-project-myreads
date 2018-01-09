import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBooks: PropTypes.func.isRequired
  };

  render() {
    const { books, title, shelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter(book => shelf === book.shelf)
              .map(book => (
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
