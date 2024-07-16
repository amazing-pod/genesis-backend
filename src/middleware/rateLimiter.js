const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: true,
	legacyHeaders: false,
});

module.exports = limiter;
