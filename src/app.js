import express from "express";

const app = express();
app.use(express.json());

//GET Request
app.get("/hello", (req, res) => {
  res.json({ message: "Hello" });
});

//POST Request
app.post("/user", (req, res) => {
  const { name, age } = req.body;
  //check validation
  if (!name || !age) {
    return res.status(400).json({ error: "Missing name or age" });
  }
  res.status(201).json({ id: 1, name, age });
});

// check authorization token
app.get("/secure-token", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Missing token" });
  }
  if (authHeader !== "Bearer mysecrettoken") {
    return res.status(403).json({ error: "Invalid token" });
  }
  res.json({ secret: "This is a protected resource" });
});
export default app;
