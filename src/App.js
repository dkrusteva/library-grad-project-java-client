import React, { Component } from 'react';
import './App.css';
import Book from './components/book';
import Hello from './components/hello';
import NewReservationDialog from "./components/newReservationDialog";
import Reservation from "./components/reservation";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          books: [],            //a list of the books on the db, listed in the left panel of the screen (sample file: sample_books.json in the repository)
          reservations: [],     //a list of the reservations on the db, listed in the right panel of the screen (sample file: sample_reservations.json in the repository)
          selectedBook: null    //indicates when a book is clicked, causes the Reserve Dialog to appear
        };
    }

    componentDidMount() {
        const url ="http://localhost:8080/api/books";
        fetch(url) //AJAX
            .then(response => response.json())
            .then((data) => {
                this.setState({
                   books: data
                });
            });
        this.refreshReservations();
    }

    //gets passed to the Book component and is called if that book is clicked
    selectBook = (book) => {
        console.log(book);
        this.setState({
            selectedBook: book
        });
    }

    //gets passed to the NewReservationDialog component, and gets called when a new reservation is made
    refreshReservations = () => {
        const url ="http://localhost:8080/res-api/reservations";
        fetch(url) //AJAX
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    reservations: data
                });
            });
    }



    render() {

        return (


            <div className="app">
                <div className="book-panel">
                    <div className = "books">
                        {this.state.books.map((book) => {
                            return <Book key={book.id}
                                         book={book}
                                         selectBook={this.selectBook}
                                         selected = {book===this.state.selectedBook}/>
                        })}
                    </div>
                </div>

                <div className="reservation-panel">

                    <Hello name="Diana"/>

                    <div className="reserveDialog">
                        {this.state.selectedBook !== null && <NewReservationDialog book= {this.state.selectedBook} refreshReservations = {this.refreshReservations} />}
                    </div>

                    <div className="reservations">
                        <div><h2>Your Reserved Books:</h2></div>
                        <ul>
                        {this.state.reservations.map((reservation) => {
                            return <li key={reservation.id}><Reservation
                                                    reservation = {reservation}/></li>
                        })}
                        </ul>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
