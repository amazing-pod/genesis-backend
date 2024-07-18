require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = 3000;
const limiter = require("./middleware/rateLimiter");
const userRoutes = require("./routes/userRoutes");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(limiter);

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use("/users", userRoutes);

app.listen(PORT, () => {
	console.log(`Server running at PORT: ${PORT}`);
});
