const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("../../config/passport");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.get('/', isAuthenticated, (req, res) => {
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
        console.log(`${req.user.firstName} ${req.user.lastName} has logged in.`);

        res.send('Hi.');
    });

router.post('/logout', (req, res) => {
    req.logout();
    res.send('Logout was successful');
})

router.post("/updateProfile", isAuthenticated, userController.update);

router.post('/', userController.create);
router.get("/getUser", isAuthenticated, userController.getUser);

router.get('/searchUsers', isAuthenticated, userController.getMatches);

router.get('/makeUsers', userController.putABunchInThere);
router.delete('/deleteDummies', userController.deleteDummies);

module.exports = router;
