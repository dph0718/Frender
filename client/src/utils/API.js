import axios from "axios";

export default {

  //creates a user
  createUser: function (data) {
    console.log('creating user...');
    return axios.post("/api/users", data)
      .then(res => {
        console.log(`createUser frontend fx's data:`, data)
        console.log('createUser frontend fx res.data', res.data);
      });
  },

  //logs in user
  logInUser: function (data) {
    console.log('attempting login from API...with :', data);
    return axios.post('/api/users/login', data)
      .then(res => {
        if (res.data) {
          console.log(res.data);
          return "Login was good.!";
        }
        else {
          return "Login FAILED."
        }
      })
  },

  logoutUser: () => {
    return axios.post('/api/users/logout').then(res => {
      console.log(res.data)
      return
    })
  },

  getUserInfo: (component) => {
    //gotta rename & file this route.
    return axios.get('/home').then(res => {
      console.log('home axios res:', res)
      component.setState({
        email: res.data.email,
        id: res.data.id
      })
    })
  },

  doesUserExist: () => {
    return axios.get('/api/users')
      .then(res => {
        return (res.data);
      })
  },

  updateProfile: (data) => {
    console.log('within API.updateProfile, using:');
    console.log(data);
    return axios.post('/api/users/updateProfile', data)
      .then(res => {
        console.log('Got a response from the server. Tell the component we"re good!')
        return `"We're good. Got this message from the server: ${res.data}`
      })
  }
  // // Gets the user with the given id
  // getUser: function (id) {
  //   return axios.get("/api/users/" + id);
  // },
  // // Deletes the book with the given id
  // deleteBook: function (id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // // Saves a book to the database
  // saveBook: function (bookData) {
  //   return axios.post("/api/books", bookData);
  // },
};
