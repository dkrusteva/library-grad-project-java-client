import React from "react";

class Hello extends React.Component {
    render() {
        return <div>Hello {this.props.name}! Please select a book on the left to reserve. </div>
    }
}

export default Hello;