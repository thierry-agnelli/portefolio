// Dépendances
import express from "express";
import cors from "cors";
// Routes
import userRoute from "./routes/user.js";
import skillRoute from "./routes/skill.js";
import messageRouter from "./routes/message.js";

// Création app
const app = express()

// Cors
app.use(cors());

// Acceptation données json
app.use(express.json());

// Routes
app.use("/user", userRoute);
app.use("/skill", skillRoute);
app.use("/message", messageRouter);

// Home
app.get("/", (req, res) => {
    res.send("Server home");
});

export default app;
