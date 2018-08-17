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

  getMatches: (req, res) => {
    const dummy = {
      instrumentsSought: ['zither'],
      skillSought: 1,
      influences: ['pearl jam', '']
    };
    console.log('Getting Matches');
    //replace dummy with req.user after testing
    db.User
      // .find({ instruments: { $all: dummy.instrumentsSought[0] } })
      .find({ instruments: { $all: dummy.instrumentsSought[0] } })
      // .where('experience').gte(parseInt(dummy.skillSought))
      .then(result => {
        //[ ] Filter out the result with the user's _id.
        //[ ] Loop through each of user's fields and assign points based on difference of index of match

        //[ ] 
        console.log('How Many Match Results:', result)
        //send these results back to users.js in Routes... eventually
      })
  },

  putABunchInThere: (req, res) => {
    const rand = (n) => Math.ceil(n * Math.random());

    const newUsers = [];
    const pickNFromArray = (n, srcArray, destArray) => {
      for (let j = 0; j < rand(n); j++) {
        let datNumba = rand(srcArray.length-1)
        let theItem;
        if (srcArray[datNumba]) {
          theItem = srcArray[datNumba].toLowerCase();
          destArray.push(theItem);
          srcArray.splice(datNumba, 1);
        }
      }
      return destArray;
    };

    for (let i = 0; i < 40; i++) {
      dummyData = {
        firstNames: ["Bob", "Brandon", "Howard", "Hugh", "Humphrey",
          "Mike", "Sarah", "Michelle", "Stephanie", "Donna Jo", "Jesse", "Danny",
          "Rebecca", "Stan", "Eric", "Kenny", "Kyle", "Carol", "Ben", "Jason"],

        lastNames: ["Saget", "McNulty", "Hughes", "Grant", "Bogart",
          "Seaver", "Silverman", "Tanner", "Winslow", "Lambert", "Katsopolis",
          "Brady", "Lewis", "Cartman", "Blankenship", "King", "Carson", "Voorhies"],

        instruments: ["Saxophone", "Kazoo", "Guitar", "Bass", "Violin", "Drums",
          "Piano", "Keyboard", "Xylophone", "Glockenspiel", "Flute", "Piccolo", "Viola",
          "Synthesizer", "Trumpet", "Trombone", "Tuba", "Harp", "Harmonica", "Fiddle",
          "Contrabass", "Zither", "Ukulele", "Lute", "Clarinet", "Banjo", "Vocals"],

        genres: ["Rock", "Jazz", "Classical", "Electronica", "Metal", "Groove", "R&B",
          "Rap", "Big Band"],

        shortList: ["Guitar", "Bass", "Drums", "Vocals", "Keyboard"]



      };
      let randExperience = rand(5);
      let randSkillSot = rand(5);
      let randEndeav = rand(3);
      let rand1Name = dummyData.firstNames[rand(dummyData.firstNames.length) - 1];
      let rand2Name = dummyData.lastNames[rand(dummyData.lastNames.length) - 1];
      let instArray = [];
      let instSotArray = [];
      let genArray = [];

      let randInst = pickNFromArray(5, dummyData.instruments, instArray);
      let randInstSot = pickNFromArray(3, dummyData.shortList, instSotArray);
      let randGenres = pickNFromArray(3, dummyData.genres, genArray);

      let newUser = {
        firstName: rand1Name,
        lastName: rand2Name,
        instruments: randInst,
        instrumentsSought: randInstSot,
        genres: randGenres,
        experience: randExperience,
        skillSought: randSkillSot,
        endeavors: randEndeav,
      }

      newUsers.push(newUser);
    }

    db.User
      .insertMany(newUsers).then(
        dbRes => console.log("The database sent back:", dbRes)
      );

    res.send('made a BUNCH!')
  },

  update: (req, res) => {

    console.log("IN DA UPDATE")
    console.log(req.user);
    console.log(req.body);
    db.User
      .findOne({ _id: req.user._id })
      // .findOne({ _id: req.user._id })
      .then(result => {
        let updatedUser = {};
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
                  //new, not broken...
                  updatedUser[prop] = updateRes[prop]
                })
            }
          }
        }
        console.log(`Next to do: Update ${req.user.firstName}'s profile`)

        // res.send("THe profile was found and values compared. Update has occured.")
        // console.log(`updating ${req.user.firstName}'s profile`)
      })
  },

  deleteDummies: (req, res) => {
    db.User.deleteMany({ password: null })
      .then(res => {
        console.log('First succes story.')
      })
  },
};
