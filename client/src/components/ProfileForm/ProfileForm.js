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
    experience: undefined,
    instruments: [],
    instrumentsSought: [],
    influences: [],
    genres: [],
    endeavors: "",
    etCetera: "",
    formErrors: {
      firstName: ``,
      lastName: ``,
      instruments: ``,
      instrumentsSought: ``,
      influences: ``,
      genres: ``,
    },
    formValid: false,
    firstNameValid: false,
    lastNameValid: false,
    instrumentsValid: false,
    instrumentsSoughtValid: false,
    influencesValid: false,
    genresValid: false,
  };

  // handle any changes to the input fields
  //while validating data
  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;
    // Set the state for the appropriate input field
    this.setState({
      [name]: value,
    }, () => {
      this.validateField(name, value)
    });
  };

  validateField = (fieldName, value) => {
    let fieldErrors = this.state.formErrors;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let instrumentsValid = this.state.firstNameValid;
    let instrumentsSoughtValid = this.state.instrumentsSoughtValid;
    let influencesValid = this.state.influencesValid;
    let genresValid = this.state.genresValid;
    console.log(this.state.formErrors)
    console.log(this.state.formValid)
    console.log(this.state.instrumentsSought[0])
    switch (fieldName) {
      case 'firstName': firstNameValid = value.length > 0;
        fieldErrors.firstName = firstNameValid ? '' : 'first name required';
        break;
      case 'lastName': lastNameValid = value.length > 0;
        fieldErrors.lastName = lastNameValid ? '' : 'last name required';
        break;
      case 'instruments': instrumentsValid = this.state.instruments.length > 0;
        fieldErrors.instruments = instrumentsValid ? '' : 'at least one instrument required';
        break;
      case 'instrumentsSought': instrumentsSoughtValid = this.state.instrumentsSought.length > 0;
        fieldErrors.instrumentsSought = instrumentsSoughtValid ? '' : `they've gotta play something.`;
        break;
      case 'influences': influencesValid = this.state.influences.length > 0;
        fieldErrors.influences = influencesValid ? '' : 'not even the Beatles?';
        break;
      case 'genres': genresValid = value.length > 0;
        fieldErrors.genres = genresValid ? '' : 'one genre required.';
        break;
    }
    this.setState({
      formErrors: fieldErrors,
      firstNameValid: firstNameValid,
      lastNameValid: lastNameValid,
      instrumentsValid: instrumentsValid,
      instrumentsSoughtValid: instrumentsSoughtValid,
      influencesValid: influencesValid,
      genresValid: genresValid,
    }, this.validateForm);
  };

  validateForm = () => {
    this.setState({
      formValid: this.state.firstNameValid
        && this.state.lastNameValid
        && this.state.instrumentsValid
        && this.state.instrumentsSoughtValid
        && this.state.influencesValid
        && this.state.genresValid
    })
  };

  //We need to get the user's info and populate the input fields with 
  //data already associated with the user\
  componentDidMount() {
    API.getUserInfo(this).then(res => {
      console.log("PROFILE FORM'S STATE:")
      console.log(this.state);
    });
  };

  //post this info to the user's mongodb document
  handleFormSubmit = event => {
    event.preventDefault();
    API.updateProfile(this.state).then(res => {
    })
  };

  //collects the arrays of inputs from the state of the children <ArrayInput /> components
  gimmeDat = (theState, name) => {
    this.setState({
      [name]: theState,
    })
  };


  render() {

    //sets initial values for <select> inputs to the user's info; or if none, to 3.
    //sets the state so if values are not changed, there will be data submitted in the state. 
    let initSelectVal = (theProp) => {
      if (this.state[theProp]) {
        return this.state[theProp]
      } else {
        this.setState({ [theProp]: 3 });
        return 3;
      };
    };

    return (
      <div className='profileEditor'>
        <div id='scrollBlocker'></div>

        <form
          id='profileForm'
          onChange={this.handleInputChange}>

          <h1> The World is Your Stage,</h1>
          <h3>Or something profound like that.</h3>

          <h3>First Name</h3>
          <input statename="firstName" name="firstName" type='text' defaultValue={this.state.firstName} />

          <h3>Last Name</h3>
          <input name="lastName" type='text' defaultValue={this.state.lastName} />

          <h3>Email</h3>
          <input name="email" type='email' defaultValue={this.state.email} />

          <h3>Your experience level</h3>
          <select name="experience" value={initSelectVal('experience')}>
            <option name="experience" value="1">I'm awful, but I'm trying.</option>
            <option name="experience" value="2">I'm ... Ok?</option>
            <option name="experience" value="3">I'm good. Not great, but I'm good. </option>
            <option name="experience" value="4">I'm quite comfortable on stage or in the studio.</option>
            <option name="experience" value="5">Hold my Grammy while I finish editing my profile.</option>
          </select>

          <h3>You're willing to play with someone who at least:</h3>
          <select name="skillSought" value={initSelectVal('skillSought')}>
            <option name="skillSought" value="1">knows what their instrument is called.</option>
            <option name="skillSought" value="2">can play something vaguely familiar.</option>
            <option name="skillSought" value="3">won't blow you away, but can keep up. </option>
            <option name="skillSought" value="4">has been around and learned some things.</option>
            <option name="skillSought" value="5">has been on screens and magazines for their talent.</option>
          </select>

          <ArrayInput
            statename="instruments"
            gimmeDat={this.gimmeDat}
            title='instrument'
            formTitle="Instruments you play:"
            ex0='E.g., guitar'
            ex1='bagpipes'
            ex2='piccolo'
            placeholder="You're really a jack of all trades, huh?"
            items={this.state.instruments} />

          <ArrayInput
            statename="instrumentsSought"
            gimmeDat={this.gimmeDat}
            title='sought instrument'
            formTitle="You're looking to jam with someone who plays:"
            ex0='E.g., castanets'
            ex1='cuica'
            ex2='bassoon'
            placeholder="Shotgun approach. I like it."
            items={this.state.instrumentsSought} />

          <ArrayInput
            statename="influences"
            gimmeDat={this.gimmeDat}
            title='influence'
            formTitle="Your influences:"
            ex0='E.g., The Wiggles'
            ex1='Jesse and the Rippers'
            ex2='Wyld Stallyns'
            placeholder="Duke Silver"
            items={this.state.influences} />

          <ArrayInput
            statename="genres"
            gimmeDat={this.gimmeDat}
            title='genre'
            formTitle="Genres played:"
            ex0='E.g., metal/bluegrass fusion'
            ex1="children's songs"
            ex2="80's television theme songs"
            placeholder="You sure you're not spreading yourself thin?"
            items={this.state.genres} />

          <h3>Creative endeavors</h3>
          <select name="endeavors" value={initSelectVal('endeavors')}>
            <option name="endeavors" value="1">I just want to write music.</option>
            <option name="endeavors" value="2">I want to play some covers.</option>
            <option name="endeavors" value="3">Let's just see what happens...</option>
          </select>

          <h3>Got a decent pic?</h3>
          <input statename="image" name="image" defaultValue={this.state.image} />


          <h3>Anything else?</h3>
          <textarea name='etCetera'
            value={this.state.etCetera}></textarea>
          <button type='submit'
            onClick={this.handleFormSubmit}>Create Profile</button>
        </form>
        {/* <button onClick={API.getMatches}> SEARCH
        </button>
          <button onClick={API.makeABunch}> MAKE
        </button>
          <button onClick={API.deleteDummies}> Delete DUMMIES
        </button> */}
      </div>
    );
  }
}

export default ProfileForm;
