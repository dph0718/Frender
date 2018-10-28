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
      .then((res) => {
        console.log('/api/users/login post method"s res:')
        console.log(res)
        if (res.data) {
          console.log(res)
            console.log("Login was good.!");
            return res.data;
        }
        else {
          // res.send("Login FAILED.");
        }
      })
  },

  //logs out user
  logoutUser: () => {
    return axios.post('/api/users/logout').then(res => {
      return
    })
  },

  //gets user info for display & form filling
  getUserInfo: (component) => {
    return axios.get('/api/users/getUser').then(res => {
      console.log('DATA from getUserInfo API')
      console.log(res.data);

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





  //These routes access the database=======================
  doesUserExist: () => {
    return axios.get('/api/users')
      .then(res => {
        console.log('doesUserExist? ')
        console.log(res)

        return (res.data);
      })
  },

  updateProfile: (data) => {
    return axios.post('/api/users/updateProfile', data)
      .then(res => {
        return res.data;
      })
  },

  makeABunch: () => {
    return axios.get('/api/users/makeUsers')
      .then(res => {
        console.log(`${res.data.length} Documents added to Collection`);
      })
  },

  deleteDummies: () => {
    return axios.delete('/api/users/deleteDummies')
      .then(res => {
        console.log("Dummies deleted!")
      })

  },

  getMatches: () => {
    return axios.get('/api/users/searchUsers')
      .then(res => {
        //isAuthenticated is middleware in this route;
        //if successful, 
        //res.data is an Array of all matched User objects
        console.log(res.data);
        return res.data;
      })
  },
};
