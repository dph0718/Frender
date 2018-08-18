import axios from "axios";

export default {

  //creates a user
  createUser: function (data) {
    console.log('creating user...');
    return axios.post("/api/users", data)
      .then(res => {
      });
  },

  //logs in user
  logInUser: function (data) {
    return axios.post('/api/users/login', data)
      .then(res => {
        if (res.data) {
          return "Login was good.!";
        }
        else {
          return "Login FAILED."
        }
      })
  },

  logoutUser: () => {
    return axios.post('/api/users/logout').then(res => {
      return
    })
  },

  getUserInfo: (component) => {
    //gotta rename & file this route.
    return axios.get('/home').then(res => {
      for (var prop in res.data) {
        component.setState({
          [prop]: res.data[prop]
        })
      }
      // component.setState({
      //   email: res.data.email,
      //   id: res.data.id
      // })
    })
  },

  doesUserExist: () => {
    return axios.get('/api/users')
      .then(res => {
        return (res.data);
      })
  },

  updateProfile: (data) => {
    return axios.post('/api/users/updateProfile', data)
      .then(res => {
        return res.data;
      })
  },

  makeABunch: ()=>{
    return axios.get('/api/users/makeUsers')
    .then(res=>{
      console.log("This should be a long list of _id's:", res.data);
    })
    // console.log('we already populated the db.')
  }, 

  deleteDummies: ()=>{
    return axios.delete('/api/users/deleteDummies')
    .then(res=>{
      console.log("Dummies deleted!")
    })

  },

  getMatches: () => {
    return axios.get('/api/users/searchUsers')
    .then(res=>{
      console.log(res);
    })

  },
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
