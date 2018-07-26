const router = require("express").Router();
// const booksController = require("../../controllers/booksController");
const userController = require("../../controllers/userController");


router.get('/', (req, res) => {
  res.json('i think you got it.');
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
