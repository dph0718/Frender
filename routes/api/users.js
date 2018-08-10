const router = require("express").Router();
// const booksController = require("../../controllers/booksController");
const userController = require("../../controllers/userController");
const passport = require("../../config/passport");


router.get('/', (req, res) => {
  if (!req.user) {
    res.send(false)
  } else {
    res.send(true);
  }
});

// router.post('/login', passport.authenticate("local"), function (req, res) {
//   console.log('login route hit!');
//   // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
//   // So we're sending the user back the route to the members page because the redirect will happen on the front end
//   // They won't get this or even be able to access this page if they aren't authed
//   res.json("/members");
// });
// req is not defined here, but for success and failure redirects,
//    insrt this object as the second param of post like so:
// router.post('/login', passport.authenticate("local",
//   // {successRedirect: '/page/html/success',
//   // failureRedirect: '/page/html/unfortunate', // see text
//   // failureFlash: true // optional, see text as well
// })
// ,

router.post('/login', passport.authenticate("local"),

  function (req, res) {
    console.log(req.user);
    // console.log('frender login route req.body:', req.body)
    // console.log('frendr login req.user:', req.user);
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed

    //BTW: res.redirect performs a GET request to whatever other route you tell it. 
    // res.redirect(`/home`);
    // res.json(`${req.user}`)

    // Send an object that contains both the route to redirect to, and 
    //JUST KIDDING. gona try: send true.
    //  it doesn't get here unless it passes anyway, right? try not authenticating and see if it logs.

    res.send("This the res.send from from users router. ");
  });

router.post('/logout', (req, res) => {
  req.logout();
  res.send('Logout was successful');
})

// router.post("/updateProfile", (req, res) => {
//   console.log('someone is trying to update their profile with:', req.body)
//   console.log(`We'll send a fake success message...`)
//   res.send(`This is pretend success message. Shootin' blanks here.`)
// })

//+++Trying userController.update rather than (req, res_=>{})
router.post("/updateProfile", userController.update);

router.post('/', userController.create);
// router.post('/', (req, res) => {
//   console.log('what is this>>????', req);
//   res.json('i think you got it.');
// });

// Matches with "/api/books"


// router.route("/")
//   .post(userController.create)


// .get();
// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
