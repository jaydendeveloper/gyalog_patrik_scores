import Database from "better-sqlite3";

export const db = new Database("db.sqlite");

db.prepare("DROP TABLE IF EXISTS scores").run();

db.exec(`
CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game TEXT NOT NULL,
    score INTEGER NOT NULL
);`
);


db.exec(`
INSERT INTO scores (game, score) VALUES
('Pacman', 100),
('Tetris', 200),
('Mario', 300),
('Counter-Strike', 400);
`);

export const getAllScores = ()=>{
    const scores = db.prepare("SELECT * FROM scores").all();
    return scores;
}


export const getScore = (id)=>{
    const score = db.prepare("SELECT * FROM scores WHERE id = ?").get(id);
    if (!score) {
        return {
            error: "Score not found",
        }
    }
    return score;
}

export const addScore = (game, score) => {
    const result = db.prepare("INSERT INTO scores (game, score) VALUES (?, ?)").run(game, score);;
    return { id: result.lastInsertRowid};
};

export const deleteScore = (id) => {
    const scoreToDelete = db.prepare("DELETE FROM scores WHERE id = ?").run(id);
    if (!scoreToDelete) {
        return {
            error: "Score not found",
        }
    }

    return {
        message: "No Content",
    }
}
