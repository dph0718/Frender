import React, { Component } from "react";
import "./profileform.css";
import API from "../../utils/API";

class ArrayInput extends Component {
  state = {
    title: this.props.title,
    numOfInput: 3,
    extraInputs: [],
    items: [],
  };

  //this handles the inheritance of the user's info from its parent, the form
  componentWillReceiveProps(newProps) {
    if (newProps.items !== this.state.items) {
      this.setState({items: newProps.items }, setTimeout(1000, console.log("TJE STATE OM ARRAY IMPUT:", this.state))) 
    }
  };

  // handle any changes to the input fields
  handleInputChange = event => {
    let storedArray = this.state.items;
    const { name, value } = event.target;
    let nimba = parseInt(name, 10);
    storedArray[nimba] = value;
    this.setState({
      items: storedArray,
    });
    this.props.gimmeDat(this.state.array, this.props.statename);
    console.log("handlin' dat change:", this.state.array)
  };

  //adds an input index to the extraInputs array
  addAnInput = (event) => {
    event.preventDefault();
    this.setState({ extraInputs: [...this.state.extraInputs, this.state.numOfInput] });
    this.setState({ numOfInput: (this.state.numOfInput + 1) });
    // this.forceUpdate();
    console.log('array of extra inputs:', this.state.extraInputs);
    console.log('numofinput:', this.state.numOfInput);
  }

  popExtras = () => {
    console.log("THE ITEMS", this.props.items);
    let xtrarray = [];
    if (this.props.items.length > this.state.numOfInput) {
      for (let i = this.state.numOfInput; i < this.props.items.length; i++) {
        console.log('numOfInput:', this.state.numOfInput)
        console.log(i)
        console.log('itemsLength:', this.props.items.length)
        xtrarray.push(i);
      }
    } else {
      console.log("Where are my VALUES!?")
    }
    this.setState({ extraInputs: xtrarray });
  }

  componentDidMount() {
    console.log('mounted')
    this.popExtras();
  };

  render() {
    console.log('ARRYINPUT RENDERs')
    console.log(this.props.items)

    let xtraInput = this.state.extraInputs;
    const Inputter = (i, property) => {
      return (
        <div>
          <input
            type='text'
            statename={this.props.statename}
            name={i}
            placeholder={property}
          // value={this.props.values[i]} 
          /> <br />
        </div>
      )
    }

    return (
      <div>
        {/* <div>{this.originalArray(Inputter)}</div> */}
        <fieldset
          onChange={this.handleInputChange}>
          <legend>{this.props.formTitle}</legend>
          <input type='text' 
          statename={this.props.statename} 
          name="0" placeholder={this.props.ex0} 
          defaultValue={this.state.items[0]} 
          onChange={this.handleInputChange}
          /> <br />
          <input type='text' 
          statename={this.props.statename} 
          name="1" placeholder={this.props.ex1} 
          defaultValue={this.state.items[1]}
          onChange={this.handleInputChange}
          /><br />
          <input type='text' 
          statename={this.props.statename} 
          name="2" placeholder={this.props.ex2} 
          defaultValue={this.state.items[2]}
          onChange={this.handleInputChange}
          /><br />
          {xtraInput.map((name, index) => {
            let num = parseInt(name);
            console.log('numnum:', name)
            return <div key={name}>
              <input type='text'
                statename={this.props.statename}
                key={name + index}
                name={name}
                placeholder={this.props.placeholder}
                value={this.props.items[num]}>
              </input><br />
            </div>;
          })}
          <button id='addInst'
            onClick={this.addAnInput}> Add {this.props.title}</button>
        </fieldset>


      </div>

    );
  }
}

export default ArrayInput;
