// Dépendances
import express from "express";
import cors from "cors";
// Routes
import userRoute from "./routes/user.js";

// Création app
const app = express()

// Cors
app.use(cors());

// Acceptation données json
app.use(express.json());

// Routes
app.use("/user", userRoute);


// Home
app.get("/", (req, res) => {
    res.send("Server home");
});

export default app;

;