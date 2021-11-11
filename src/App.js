import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Modal from "./Modal";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      counter: 0,
      show: false,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  manageDecrement = () => {
    this.setState((prevState) => {
    if(prevState.counter === 0 ){
      this.showModal();
    }else{
      return ({counter: this.state.counter -1})
    }
  })
  }

  render() {
    return (
      <div data-test="component-app">
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p data-test="component-app-error">{this.state.show? "The counter cannot be decremented less than 0": ""}</p>
        </Modal>
        <h1 data-test="counter-display">The counter is {this.state.counter}</h1>
        <button data-test="decrement-button" onClick={() => this.manageDecrement()}>Decrement counter</button>
        <button data-test="increment-button" onClick={() => this.setState({counter: this.state.counter + 1})}>Increment counter</button>
      </div>
    );
  }
}

export default App;
