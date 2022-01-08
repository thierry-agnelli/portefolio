// Dépendances
import express from "express";
import cors from "cors";
// Routes
import userRoute from "./routes/user.js";
import skillRoute from "./routes/skill.js";
import messageRouter from "./routes/message.js";
import infoRouter from "./routes/info.js";
import experienceRouter from "./routes/experiences.js";
import makingRouter from "./routes/making.js";
import imageRouter from "./routes/image.js";

// Création app
const app = express()

// Cors
app.use(cors());

// Acceptation données json + définition taille maximum des données
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));

// Routes
app.use("/user", userRoute);
app.use("/skill", skillRoute);
app.use("/message", messageRouter);
app.use("/info", infoRouter);
app.use("/experience", experienceRouter);
app.use("/making", makingRouter);
app.use("/image", imageRouter);

// Home
app.get("/", (req, res) => {
    res.send("Server home");
});

export default app;
