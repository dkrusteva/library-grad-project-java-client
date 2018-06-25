import React, { Component } from 'react';
import "./newReservationDialog.css";
import 'react-day-picker/lib/style.css';

class NewReservationDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 7,
            interval:"3",
            dt: "2018-09-25",
            userID: "James"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Controlled components used in the form, their states are updated with the function below
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    //custom submit function posts a reservation to the server, then refreshes the list of reservations; suppresses default page refresh
    handleSubmit =(event) => {

        const urlRes = "http://localhost:8080/res-api/reservations";
        const data = {id:this.state.id, book: this.props.book, dt: this.state.dt, interval: this.state.interval, userID: this.state.userID};

        fetch(urlRes, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(() => this.props.refreshReservations());

        event.preventDefault();
    }

    render() {

        return(
            <div className="newReservationDialog">
                <h4>Make a new Reservation</h4>
                <form onSubmit={this.handleSubmit}>
                    <span className="bookToReserve"><h5>{this.props.book.title}</h5></span>

                    <label>Hire period:&nbsp;
                    <select name="interval" value={this.state.interval} onChange={this.handleChange}>
                        <option value="3">3 Days</option>
                        <option value="7">1 Week</option>
                        <option value="14">2 Weeks</option>
                    </select></label><br />
                    <label>Reserve from:&nbsp;
                    <input type="date" name="dt" value={this.state.dt} onChange={this.handleChange}/></label><br />

                    <input type="submit" value="Reserve" />
                </form>

            </div>
        );
    }

}

export default NewReservationDialog;