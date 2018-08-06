const router = require("express").Router();
// const booksController = require("../../controllers/booksController");
const userController = require("../../controllers/userController");
const passport = require("../../config/passport");


router.get('/', (req, res) => {
  res.json('i think you got it.');
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

    //gonna comment this out while I figure out what's going on with the "req's"
    res.json(`/home`);
  });

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
