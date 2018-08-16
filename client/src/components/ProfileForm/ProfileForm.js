import React, { Component } from "react";
import "./profileform.css";
import ArrayInput from "./ArrayInput.js";
import API from "../../utils/API";


// const bgImg = '/images/frenderAmp-small.png';
// const divStyle = {
//   backgroundImage: 'url(' + bgImg + ')',
// };
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
    // Set the state for the appropriate input field
    this.setState({
      [name]: value,
    }, () => {
      console.log(this.state);
    });
  };

  //We need to get the user's info and populate the input fields with 
  //data already associated with the user\
  //THIS IS WHERE IT BROKE LAST TIME 
  componentDidMount() {
    API.getUserInfo(this);
    // console.log('+++++ DID THE API GETUSER!! +++++');
    setTimeout(() => { console.log("TREXXXXX", this.state) }, 1000);
  }

  //here we gotta post this stuff to the user's mongodb document
  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Attempting the updateProfile route...")
    API.updateProfile(this.state).then(res => {
    })
  };

  //collects the arrays of inputs from the state of the children <ArrayInput /> components
  gimmeDat = (theState, name) => {
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
          <input statename="firstName" name="firstName" type='text' defaultValue={this.state.firstName}/>

          <h3>Last Name</h3>
          <input name="lastName" type='text'  defaultValue={this.state.lastName}/>

          <h3>Email</h3>
          <input name="email" type='text'  defaultValue={this.state.email} />

          <h3>Your experience level</h3>
          <select name="experience"  defaultValue={this.state.experience}>
            <option name="experience" value="1">I'm awful, but I'm trying.</option>
            <option name="experience" value="2">I'm ... Ok?</option>
            <option name="experience" value="3">I'm good. Not great, but I'm good. </option>
            <option name="experience" value="4">I'm quite comfortable on stage or in the studio.</option>
            <option name="experience" value="5">Hold my Grammy while I finish editing my profile.</option>
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
          <select name="endeavors" value={this.state.endeavors}>
            <option name="endeavors" value="1">I just want to write music.</option>
            <option name="endeavors" value="2">I want to play some covers.</option>
            <option name="endeavors" value="3">Let's just see what happens...</option>
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
