require("dotenv").config(); // Added because OpenAI API key is not found otherwise
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = 3000;
const limiter = require("./middleware/rateLimiter");
const userRoutes = require("./routes/userRoutes");
const threadRoutes = require("./routes/threadRoutes");
const chatRoutes = require("./routes/chatRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
// app.use(limiter);

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use("/users", userRoutes);
app.use("/threads", threadRoutes);
app.use("/projects", projectRoutes);

app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {

});
