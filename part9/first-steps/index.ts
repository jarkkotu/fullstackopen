import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    res.status(200).send({
      weight: weight,
      height: height,
      bmi: bmi,
    });
  } catch {
    res.status(400).send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target }: { daily_exercises: number[]; target: number } = req.body;

    if (daily_exercises === undefined || target === undefined) {
      res.status(400).send({ error: "parameters missing" });
    } else {
      const result = calculateExercises(daily_exercises, target);
      res.status(200).send({ result });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
