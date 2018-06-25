import React, { Component } from 'react';
import "./book.css";


class Book extends Component {

    handleClick = () => {
        this.props.selectBook(this.props.book);
    }

    render() {

        let classes = "book";
        if(this.props.selected) {
            classes += " selected";
        }

        const title = this.props.book.title + " - "+this.props.book.publishDate + " - " + this.props.book.author;
        const style = {
            backgroundImage: `url('https://pictures.abebooks.com/isbn/${this.props.book.isbn}-uk.jpg')`

        };

        return(
            <div className={classes} onClick={this.handleClick}>
                <div className="book-picture" style={style}></div>
                <div className="book-title">{title}</div>
            </div>


        );
    }


}

export default Book;