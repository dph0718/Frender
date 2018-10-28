import React, { Component } from "react";
import "./profileform.css";

class ArrayInput extends Component {
  state = {
    title: this.props.title,
    numOfInput: 3,
    extraInputs: [],
    array: [],
  };

  //fingers X'ed
  componentWillReceiveProps(newProps) {
    if (newProps.items !== this.state.items) {
      this.setState({ array: newProps.items })
    }
  }

  // handle any changes to the input fields
  handleInputChange = event => {
    let storedArray = this.state.array;
    const { name, value } = event.target;
    let nimba = parseInt(name, 10);
    storedArray[nimba] = value;
    this.setState({
      array: storedArray,
    });
    this.props.gimmeDat(this.state.array, this.props.statename);
  };

  addAnInput = (event) => {
    event.preventDefault();
    this.setState({ extraInputs: [...this.state.extraInputs, this.state.numOfInput] });
    this.setState({ numOfInput: (this.state.numOfInput + 1) });
    // this.forceUpdate();
  }

  render() {
    let xtraInput = this.state.extraInputs;
    return (
      <div>
        <fieldset
          onChange={this.handleInputChange}>
          <legend>{this.props.formTitle}</legend>
          <input type='text' statename={this.props.statename}
            name="0"
            placeholder={this.props.ex0}
            defaultValue={this.state.array[0]} /> <br />
          <input type='text'
            statename={this.props.statename}
            name="1"
            placeholder={this.props.ex1}
            defaultValue={this.state.array[1]} /><br />
          <input type='text'
            statename={this.props.statename}
            name="2"
            placeholder={this.props.ex2}
            defaultValue={this.state.array[2]} /><br />
          {xtraInput.map(name => {
            return <div key={name}>
              <input type='text' statename={this.props.statename} key={name} name={name} placeholder={this.props.placeholder} ></input><br />
            </div>;
          })}
          <button className ='addInst'
            onClick={this.addAnInput}> Add {this.props.title}</button>
        </fieldset>
      </div>

    );
  }
}

export default ArrayInput;
