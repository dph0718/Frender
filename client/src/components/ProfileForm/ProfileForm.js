import React, { Component } from "react";
import "./profileform.css";
import ArrayInput from "./ArrayInput.js";
import API from "../../utils/API";


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
    }, () => {
      console.log(this.state);
    });
    console.log('here I come instruments', this.state.instruments)
    console.log('here I come firstname', this.state.firstName)
  };


  componentDidMount(){
    API.getUser
  }
  //here we gotta post this stuff to the user's mongodb document
  handleFormSubmit = event => {

  };

  //collects the arrays of inputs from the state of the children <ArrayInput /> components
  gimmeDat = (theState, name) => {
    console.log('logging theState:', theState);
    console.log('log the name:', name);
    this.setState({
      [name]: theState,
    })
  }

  render() {
    return (
      <div className='profileEditor'>
      <form
      id='profileForm'
        onChange={this.handleInputChange}>


          <h1> The World is Your Stage,</h1>
          <h3>Or something profound like that.</h3>

          <h3>First Name</h3>
          <input statename="firstName" name="firstName" type='text' />

          <h3>Last Name</h3>
          <input name="lastName" type='text' />

          <h3>Email</h3>
          <input name="email" type='text' />

          <h3>Your experience level</h3>
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
            ex2='Wyld Stallyns'
            placeholder="Duke Silver" />

          <ArrayInput
            statename="genres"
            gimmeDat={this.gimmeDat}
            title='genre'
            formTitle="Genres played:"
            ex0='E.g., metal/bluegrass fusion'
            ex1="children's songs"
            ex2="80's television theme songs"
            placeholder="You sure you're not spreading yourself thin?" />

          <h3>Creative endeavors</h3>
          <select name="endeavors">
            <option name="endeavors" value="0">I just want to write music.</option>
            <option name="endeavors" value="1">I want to play some covers.</option>
            <option name="endeavors" value="2">Let's just see what happens...</option>
          </select>

          <h3>Anything else?</h3>
          <textarea name='etCetera'></textarea>
        <button type='submit'
          onClick={this.handleFormSubmit}>Create Profile</button>
      </form>
      </div>
    );
  }
}

export default ProfileForm;
