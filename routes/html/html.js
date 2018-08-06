const router = require("express").Router();
const passport = require("../../config/passport");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.get('/', (req, res) => {
  console.log('tootin')
  res.redirect('/bugpie/html/search')
});

router.get('/search', isAuthenticated, (req, res) => {
  console.log('tootin again')
  res.json('/profile')
});



router.get('/unfortunate', (req, res) => {
  console.log('THe User failed to log in!!')
  res.json("/unfortunate");
  // res.redirect('/home');
});
router.get('/success', (req, res) => {
  console.log('A successful login.')
  res.json("/success");
})

// router.post('/login', passport.authenticate("local"), function (req, res) {
//   console.log('login route hit!');
//   // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
//   // So we're sending the user back the route to the members page because the redirect will happen on the front end
//   // They won't get this or even be able to access this page if they aren't authed
//   res.json("/members");
// });

module.exports = router;
