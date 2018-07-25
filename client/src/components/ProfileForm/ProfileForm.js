import React, { Component } from "react";
import "./profileform.css";
import ArrayInput from "./ArrayInput.js";

const bgImg = '/images/frenderAmp-small.png';
const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};
class ProfileForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    experience: "",
    instruments: [],
    influences: [],
    genres: [],
    endeavors: "",
    etCetera: "",
  };

  // handle any changes to the input fields
  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;
    console.log('firstName:', this.state.firstName);
    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
    console.log('here I come instruments', this.state.instruments)
    console.log('here I come firstname', this.state.firstName)
  };


  handleFormSubmit = event => {
    console.log('ok');
  };

  gimmeDat = (theState, name) => {
    console.log('logging theState:', theState);
    console.log('log the name:', name);
    this.setState({
      [name]: theState,
    })
  }
  render() {
    return (
      <form
        onChange={this.handleInputChange}>
        <div className="fullPage"
          style={divStyle}>

          <h2> The World is Your Stage,</h2>
          <h3>Or something profound like that.</h3>
          <p>First Name</p>
          <input statename="firstName" name="firstName" type='text' />

          <p>Last Name</p>
          <input name="lastName" type='text' />

          <p>Email</p>
          <input name="email" type='text' />

          <p>Your experience level</p>
          <select name="experience">
            <option name="experience" value="0">I'm awful, but I'm trying.</option>
            <option name="experience" value="1">I'm ... Ok?</option>
            <option name="experience" value="2">I'm good. Not great, but I'm good. </option>
            <option name="experience" value="3">I'm quite comfortable on stage or in the studio.</option>
            <option name="experience" value="4">Hold my Grammy while I finish editing my profile.</option>
          </select>

          <ArrayInput
            statename="instruments"
            gimmeDat={this.gimmeDat}
            title='instrument'
            formTitle="Instruments you play:"
            ex0='E.g., guitar'
            ex1='bagpipes'
            ex2='piccolo'
            placeholder="You're really a jack of all trades, huh?" />

          <ArrayInput
            statename="influences"
            gimmeDat={this.gimmeDat}
            title='influence'
            formTitle="Your influences:"
            ex0='E.g., The Wiggles'
            ex1='Jesse and the Rippers'
            ex2='Spinal Tap'
            placeholder="You know you wanna put Barenaked Ladies." />

          <ArrayInput
            statename="genres"
            gimmeDat={this.gimmeDat}
            title='genre'
            formTitle="Genres played:"
            ex0='E.g., metal/bluegrass fusion'
            ex1="children's songs"
            ex2="80's television theme songs"
            placeholder="You sure you're not spreading yourself thin?" />

          <p>Creative endeavors</p>
          <select>
            <option name="endeavors" value="0">I just want to write music.</option>
            <option name="endeavors" value="1">I want to play some covers.</option>
            <option name="endeavors" value="2">Let's just see what happens...</option>
          </select>

          <p>Anything else?</p>
          <textarea name='etCetera'></textarea>
        </div>
        <button type='submit'
          onClick={this.handleFormSubmit}>Create Profile</button>
      </form>
    );
  }
}

export default ProfileForm;
