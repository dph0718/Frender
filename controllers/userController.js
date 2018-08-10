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

  update: (req, res) => {

    console.log("IN DA UPDATE")
    console.log(req.user);
    console.log(req.body);
    db.User
      .findOne({ _id: req.user._id })
      // .findOne({ _id: req.user._id })
      .then(result => {
        console.log('within update:, doing db.find, and getting:', result)
        console.log('result.email:', result.email)
        for (var prop in req.body) {
          // for (var prop in req.user) {
          console.log('properdad:', prop)
          console.log('THE req.body PROP::', `${req.body[prop]}`)
          if (req.body[prop]) {
            if (result[prop] == req.body[prop]) {
              console.log('a continued prop !!**!!**');
            }
            else {
              console.log(`The new and old are not the same, we have to update it.`)
              db.User.findOneAndUpdate({ _id: req.user._id }, { [prop]: req.body[prop] })
                .then(updateRes => {
                  console.log(`Now CHECK ROBO and SEe if it worked!!`)
                })
            }
          }
        }
        console.log(`Next to do: Update ${req.user.firstName}'s profile`)
        res.send("THe profile was found and values compared. Update has occured.")
        // console.log(`updating ${req.user.firstName}'s profile`)
      })
  }
};
