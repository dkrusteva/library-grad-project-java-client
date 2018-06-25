import React, { Component } from 'react';
import "./reservation.css";

class Reservation extends Component {

    render() {

        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var cts = this.props.reservation.dt, cdate = (new Date(cts)).toLocaleString('UTC',options);
        const reservationInfo = this.props.reservation.book.title + " by "+this.props.reservation.book.author +" reserved for "+this.props.reservation.interval + " days after "+cdate;


        return(
            <div className="reservation">
                <div className="book-title">{reservationInfo}</div>
            </div>


        );
    }


}

export default Reservation;