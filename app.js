import express from "express";
import { getAllScores, getScore, addScore, deleteScore } from "./db.js";

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

    if(score.error) {
        return res.status(404).json({ error: "Score not found" });
    }

    return res.json(score);
});

app.post("/scores", (req,res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Request body is required" });
    }

    const { game, score } = req.body;

    if (!game || !score) {
        return res.status(400).json({ error: "Game and score are required" });
    }

    const newScore = addScore(game, score);
    return res.json(newScore);
})

app.delete("/scores/:id", (req, res) => {
    const id = req.params.id;

    if(!id){
        return res.status(400).json({ error: "ID is required" });
    }

    const result = deleteScore(id);
    
    if (result.error) {
        return res.status(404).json({ error: result.error });
    }

    return res.status(204).json(result);
})