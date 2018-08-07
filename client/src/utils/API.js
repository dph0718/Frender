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
        console.log('res from loginUser from API:', res)
        // window.location.assign(res.data);
        //reloads. No good. I want the site not to refresh.
        // window.history.pushState(null, null, "/home");
        //no errors, but no clue what it did. Not what I want.

        // return <Redirect push to="/home" />
        //trying the above within Login as a then method.

      })
  },

  logoutUser: () => {
    return axios.post('/api/users/logout').then(res => {
      console.log('res should be "/"', res)
    })
  },

  homeMethod: (component) => {
    console.log('homeMethod');
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

  // Gets the user with the given id
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },

  //experimental route for getting some html route response
  htmlRoute: () => {
    return axios.get('/bugpie/html')
      .then((res) => {
        console.log('You got the html routes to work!!')
        console.log('res:', res.data)
        // window.location.replace('/search');

      });
  }
};
