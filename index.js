import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.listen(PORT, () => {
    console.log(`Listening at ${BACKEND_URL}`);
});
