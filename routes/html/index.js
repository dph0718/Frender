const router = require("express").Router();
const htmlRoutes = require("./html.js");

// Book routes
// router.use("/books", bookRoutes);
router.use("/html", htmlRoutes);
module.exports = router;
