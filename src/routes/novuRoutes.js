const { serve } = require("@novu/framework/express");
const { testWorkflow } = require("../novu/workflows");
const express = require("express");
const router = express.Router();
const {
	identifySubscribers,
	getSubscriber,
} = require("../controllers/novuController");

router.use(serve({ workflows: [testWorkflow] }));
router.post("/identify-subscribers", identifySubscribers);
router.get("/get-subscriber", getSubscriber);

module.exports = router;
