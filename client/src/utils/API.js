import axios from "axios";

export default {
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },

  //creates a user
  createUser: function (data) {
    console.log('creating user...');
    return axios.post("/api/users", data)
      .then(res => {
        console.log(`createUser frontend fx's data:`, data)
        console.log('createUser frontend fx res.data', res.data);
      });
  },

  logInUser: function (data) {
    console.log('attempting login from API...with :', data);
    return axios.post('/api/users/login', data)
    .then(res=>{
      console.log('res from loginUser from API:', res)
    })
  },

  dummyMethod: hm => {
    console.log('dummy method!');
    console.log(hm);
    console.log('dummy method beginning:')
    return axios.get('/api/users')
      .then(res => {
        console.log(`axios' res:`, res);
      });
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
  }
};
