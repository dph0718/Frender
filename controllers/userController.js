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
    // [ ] Replace dummy with req.user after testing
    const dummy = {
      instrumentsSought: ['guitar', 'hurdhur', 'trombone'],
      instruments: ['lkjasdf', 'gtar', 'bass'],
      skillSought: 1,
      influences: ['pearl jam', 'brooks & dunn'],
      experience: 3,
      _id: "41224d776a326fb40f000001",
    };

    let i = 0;
    let x = 0;
    let y = 0;

    const search = (() => {
      db.User
        .find({
          //properties of THE OTHER USER
          _id: { $ne: dummy._id },
          experience: { $gte: dummy.skillSought },
          skillSought: { $lte: dummy.experience },
          instruments: { $all: dummy.instrumentsSought[x] },
          instrumentsSought: { $all: dummy.instruments[y] },
        })
        .then(result => {
          if (result.length == 0) {
            //If MY need isn't met, meet my next need.
            if (x < dummy.instrumentsSought.length - 1) {
              x++;
              search();
              //If there's still nothin by the time i've gotten to my last one, 
              //see if MY instruments, starting with my first, are needed by anyone else
              //
            } else if (y < dummy.instruments.length) {
              x = 0;
              y++;
              search();
            }
            else console.log('Sorry, no matches.')
          }
          else {
            //for each of the users, and each of their attributes, calculate abs value of the difference
            //from the dummy's/req.user's attributes.
            // or the index difference of their genres...
            //=====================================the following in a 'forEach' user(from results), and Then-> 'for ... in' for users' fields================================================
            //Each matching field yields a certain number of 'points', as these variables:
            result.forEach((e, i) => {
              const pointsAssigner = ((val) => {
                console.log(val);
                switch (val) {
                  case 0:
                    return 20;
                  case 1:
                    return 10;
                  default:
                    return 5;
                }
              })

              let instPoints = pointsAssigner(y);
              let instSotPoints = pointsAssigner(x);
              let genrePoints;
              let skillDif = Math.abs(dummy.experience - e.experience);
              let skillPoints = pointsAssigner(skillDif);
              let totalMatchPoints = instPoints + instSotPoints + skillPoints;
              console.log(`${e.firstName}'s match score is: ${totalMatchPoints}`)
            })
            //===================== end forEach function ==========================

            console.log('Match Results:', result)
            return;
          }
          // res.json("The results will be here.");
        })
    })

    search();
  },

  putABunchInThere: (req, res) => {
    const rand = (n) => Math.ceil(n * Math.random());

    const newUsers = [];
    const pickNFromArray = (n, srcArray, destArray) => {
      for (let j = 0; j < rand(n); j++) {
        let datNumba = rand(srcArray.length - 1)
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
