import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    books: PropTypes.array.isRequired
  };

  render() {
    const { books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter(book => this.props.shelf === book.shelf)
              .map(book => <Book key={book.id} book={book} />)}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
