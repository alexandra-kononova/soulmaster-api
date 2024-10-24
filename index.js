import express from "express";
import cors from "cors";
import adventureRoutes from "./routes/adventures.js";
import masterRoutes from "./routes/masters.js";
import "dotenv/config";

const PORT = process.env.PORT || 8080;
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(express.json());

app.use(express.static("public"));

app.use('/adventures', adventureRoutes);

app.use('/masters', masterRoutes);

app.listen(PORT, () => {
    console.log(`Listening at ${BACKEND_URL}`);
});
