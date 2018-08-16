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
    experience: "3",
    instruments: [],
    influences: [],
    genres: [],
    endeavors: "3",
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

  componentDidMount() {

    API.getUserInfo(this).then(res => {
      console.log('getUserInfo res:', res)
      let user = res;
      for (var prop in user) {
        console.log(`Chucking ${prop} into the res as ${user[prop]}`)
        // this.setState({[prop] : user[prop]})
      }
      console.log("ProfileForm's State at componentDidMount:", this.state)

      // this.setState( user , () => { console.log (this.state) })
    })

    //DUMMY USER to prevent repeated login ===========================
    //Activate if not connected to db yet

    // const dummy = {
    //   bunker: {
    //     firstName: 'Dummy',
    //     lastName: 'McData',
    //     email: 'bunchaHorseHockey@frender.com',
    //     experience: 2,
    //     instruments: ['piano', 'trumpet', 'zither', 'cornet'],

    //     etCetera: "I don't really exist, but if I did, I'd be a really good soccer player."
    //   }
    // };
    // this.setState(dummy.bunker, () => {
    // });

  };

  //here we gotta post this stuff to the user's mongodb document
  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Attempting the updateProfile route...")
    API.updateProfile(this.state).then(res => {
      console.log('Success! The profile has been updated!')
      console.log('The API wants you to know:', res);
      console.log(res);
    })
  };

  //collects the arrays of inputs from the state of the children <ArrayInput /> components
  gimmeDat = (theState, name) => {
    this.setState({
      [name]: theState,
    })
  }

  render() {

    console.log("ProfileForm MOUNTED")
    console.log("ProfileForm's state:", this.state);
    return (
      <div className='profileEditor'>
        <form
          id='profileForm'
          onChange={this.handleInputChange}>

          <h1> The World is Your Stage,</h1>
          <h3>Or something profound like that.</h3>

          <h3>First Name</h3>
          <input statename="firstName" name="firstName" type='text' value={this.state.firstName} />

          <h3>Last Name</h3>
          <input name="lastName" type='text' value={this.state.lastName} />

          <h3>Email</h3>
          <input name="email" type='text' value={this.state.email} />

          <h3>Your experience level</h3>
          <select name="experience" value={this.state.experience}>
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
            placeholder="You're really a jack of all trades, huh?"
            // values={this.state.instruments}
            // [ ] using a different prop here. if works, put to other ArayINputs            
            items={this.state.instruments}
          />

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
          <select name="endeavors" value={this.state.endeavors}>
            <option name="endeavors" value="1">I just want to write music.</option>
            <option name="endeavors" value="2">I want to play some covers.</option>
            <option name="endeavors" value="3">Let's just see what happens...</option>
          </select>

          <h3>Anything else?</h3>
          <textarea name='etCetera' value={this.state.etCetera}></textarea>
          <button type='submit'
            onClick={this.handleFormSubmit}>Create Profile</button>
        </form>
      </div>
    );
  }
}

export default ProfileForm;
