const router = require("express").Router();

const { OffersController } = require("../controllers");

router.get("/logid", OffersController.logid);

router.get("/logir", OffersController.logir);

module.exports = router;
