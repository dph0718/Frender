const db = require("../models");

// Defining methods for the Users Controller
module.exports = {

  //creates a new user
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

  //enters, or updates, a user's data from the profile edit form
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

  //gets matches from the db and assigns 'match points'
  getMatches: (req, res) => {
    // [ ] Replace dummy with req.user after testing
    const dummy = {
      instrumentsSought: ['bass', 'piano', 'trombone'],
      instruments: ['keyboard', 'guitar', 'bass'],
      skillSought: 1,
      influences: ['pearl jam', 'brooks & dunn', `beatles`, "waylon jennings"],
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
          let matchArray = [];
          if (result.length == 0) {
            //If MY need isn't met, meet my next need.
            if (x < dummy.instrumentsSought.length - 1) {
              console.log(`nobody wants to play ${dummy.instrumentsSought[x]}`)
              x++;
              search();
              //If there's still nothin by the time i've gotten to my last one, 
              //see if MY instruments, starting with my first, are needed by anyone else
              //
            } else if (y < dummy.instruments.length) {

              console.log(`They wanna play: ${dummy.instruments[x]}`)
              console.log(`nobody wants ME to play ${dummy.instruments[y]}`)

              x = 0;
              y++;
              search();
            }
            else console.log('Sorry, no matches.')
          }
          else {
            //This Promise makes it wait until everything's been calculated before 
            //executing res.json()
            const calculateDataPromise = new Promise((resolve, reject) => {
              resolve(console.log("Calculated match points for all matched users."));

              //=====================================the following in a 'forEach' user(from results)================================================

              result.forEach((e, i) => {
                //pointsAssigner returns a point value; used to calc instPoints, instSotPoints, and skillPoints
                const pointsAssigner = ((val) => {
                  switch (val) {
                    case 0:
                      return 20;
                    case 1:
                      return 10;
                    default:
                      return 5;
                  };
                });

                const infPointsAssign = ((val) => {
                  switch (val) {
                    case 0:
                      return 10;
                    case 1:
                      return 6;
                    default:
                      return 3;
                  };
                });

                let influencePoints = 0;

                dummy.influences.forEach((inf, ind) => {
                  if (e.influences.includes(inf)) {
                    let infDif = Math.abs(ind - e.influences.indexOf(inf));
                    if (ind == 0) {
                      influencePoints += pointsAssigner(infDif);
                      console.log(`first influence (${inf}) matched. got ${pointsAssigner(infDif)} points for it.`)
                    }
                    if (ind == 1) {
                      console.log(`second influence matched. got ${pointsAssigner(infDif)} points for it.`)
                      influencePoints += infPointsAssign(infDif);
                    }
                    else if (ind > 1) {
                      influencePoints += 2;
                      console.log(`A different influence was matched: ${inf}`)
                    };
                  } else {
                    return;
                    console.log(`${e.firstName} doesn't like ${inf}`)
                  };
                });

                //Each field yields a certain number of 'match points', as these variables:
                let instPoints = pointsAssigner(y);
                let instSotPoints = pointsAssigner(x);
                let skillDif = Math.abs(dummy.experience - e.experience);
                let skillPoints = pointsAssigner(skillDif);
                let totalMatchPoints = instPoints + instSotPoints + skillPoints + influencePoints;
                let newMatch = {
                  image: e.image,
                  firstName: e.firstName,
                  lastName: e.lastName,
                  instruments: e.instruments,
                  instrumentsSought: e.instrumentsSought,
                  rating: e.rating || undefined,
                  genres: e.genres,
                  influences: e.influences,
                  experience: e.experience,
                  endeavors: e.endeavors,
                  etCetera: e.etCetera,
                  totalMatchPoints: totalMatchPoints,
                }
                matchArray.push(newMatch);
              });
              //===================== end forEach function ==========================
            });
            calculateDataPromise
              .then(() => {
                res.json(matchArray)
                console.log(matchArray);
              });
          };
        });
    });

    console.log(`INITIAL search()`)
    search();
  },

  //This populates the db with randomized user data.
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

        influences: ["beatles", "rolling stones", "eric clapton", "guns n roses",
          "pearl jam", "foo fighters", "bach", "beethoven", "spice girls", "backstreet boys",
          "alannis morissette", "lisa loeb", "jewel", "r kelly", "waylon jennings",
          "george strait", "janis joplin", "garth brooks", "chris gaines", "destiny's child",
          "TLC", "mariah carey", "nirvana", "third eye blind",],

        shortList: ["Guitar", "Bass", "Drums", "Vocals", "Keyboard"],

        images: ["./images/stickman.png",
          "./images/angus.png",
          "./images/barry.png",
          "./images/bonham.png",
          "./images/bowie.png",
          "./images/flea.png",
          "./images/kennyg.png",
          "./images/trombone.png",
        ]

      };
      let randExperience = rand(5);
      let randSkillSot = rand(5);
      let randEndeav = rand(3);
      let rand1Name = dummyData.firstNames[rand(dummyData.firstNames.length) - 1];
      let rand2Name = dummyData.lastNames[rand(dummyData.lastNames.length) - 1];
      let instArray = [];
      let instSotArray = [];
      let genArray = [];
      let influArray = [];

      let randInst = pickNFromArray(5, dummyData.instruments, instArray);
      let randInstSot = pickNFromArray(3, dummyData.shortList, instSotArray);
      let randGenres = pickNFromArray(3, dummyData.genres, genArray);
      let randInflus = pickNFromArray(5, dummyData.influences, influArray);
      let randImage = dummyData.images[rand(dummyData.images.length-1)];

      let newUser = {
        firstName: rand1Name,
        lastName: rand2Name,
        instruments: randInst,
        instrumentsSought: randInstSot,
        genres: randGenres,
        influences: randInflus,
        experience: randExperience,
        skillSought: randSkillSot,
        endeavors: randEndeav,
        image: randImage
      }

      newUsers.push(newUser);
    }

    db.User
      .insertMany(newUsers).then(
        dbRes => console.log("The database sent back:", dbRes)
      );

    res.send('made a BUNCH!')
  },

  //This deletes all the dummy data by checking if there's a password.
  deleteDummies: (req, res) => {
    db.User.deleteMany({ password: null })
      .then(res => {
        console.log('First succes story.')
      })
  },
};
