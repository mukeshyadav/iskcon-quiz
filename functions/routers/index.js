const { Router } = require("express");

const router = Router();

router.use("/response", require("../routes/response"));

module.exports = router;
