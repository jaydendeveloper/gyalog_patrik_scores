import express from "express";
import { getAllScores, getScore } from "./db.js";

const app = express();

const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/scores", (req, res) => {
    const scores = getAllScores();
    return res.json(scores);
});

app.get("/scores/:id", (req, res) => {
    const id = req.params.id;


    const score = getScore(id);

    if(!score) {
        return res.status(404).json({ error: "Score not found" });
    }

    return res.json(score);
});