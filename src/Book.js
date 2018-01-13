import React, { Component } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBooks: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    BooksAPI.update(this.props.book, event.target.value).then(
      this.props.updateBooks
    );
  }

  render() {
    let thumbnailLink = "";
    let { book } = this.props;

    book.imageLinks
      ? (thumbnailLink = book.imageLinks.thumbnail)
      : (thumbnailLink = "http://via.placeholder.com/128x193?text=No%20Cover");

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{ backgroundImage: `url("${thumbnailLink}")` }}
            />
            <div className="book-shelf-changer">
              <select value={book.shelf || "none"} onChange={this.handleChange}>
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors ? book.authors.join(", ") : ""}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
