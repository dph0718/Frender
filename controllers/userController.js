const db = require("../models");

// Defining methods for the Users Controller
module.exports = {
  create: function (req, res) {
    console.log('inside the create function......!')
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      //instead of sending back the json data, 
      //redirect to the user's home page.
      // .then(res.redirect('/search'))
      .catch(err => res.status(422).json(err));
  },
};
