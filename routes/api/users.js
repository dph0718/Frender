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
router.post('/login', passport.authenticate("local"), function (req, res) {
  console.log('login route hit!');
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  res.json("/members");
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
