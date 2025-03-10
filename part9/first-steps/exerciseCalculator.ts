type Rating = 1 | 2 | 3;

interface CalculateExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const getRating = (average: number, target: number): Rating => {
  const ratio = average / target;
  if (ratio < 0.5) return 1;
  else if (ratio < 1) return 2;
  else return 3;
};

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 1:
      return "Shame!";
    case 2:
      return "not too bad but could be better";
    case 3:
      return "Perfect!";
    default:
      throw new Error(`Unknown rating: ${rating}`);
  }
};

export const calculateExercises = (dailyExerciseHours: Array<number>, target: number): CalculateExercisesResult => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((x) => x > 0).length;
  const exerciseHours = dailyExerciseHours.reduce((acc, curr) => acc + curr, 0);
  const average = exerciseHours / periodLength;

  const success = average >= target;
  const rating = getRating(average, target);
  const ratingDescription = getRatingDescription(rating);

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

export interface ExerciseArgs {
  target: number;
  dailyExerciseHours: Array<number>;
}

export const parseArgs = (args: Array<string>): ExerciseArgs => {
  if (args.length < 4) {
    throw new Error("Usage: <target> <day-1-exercisehours> ... <day-n-exercisehours");
  }

  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error("Provided target was not a number");
  }

  const dailyExerciseHours = new Array<number>();
  let i = 3;
  while (i < args.length) {
    const hours = Number(args[i]);
    if (isNaN(hours)) {
      throw new Error(`Day ${i - 2} exercise hours '(${args[i]})' was not a number`);
    }

    dailyExerciseHours.push(hours);

    i++;
  }

  return {
    target: target,
    dailyExerciseHours: dailyExerciseHours,
  };
};

try {
  const { dailyExerciseHours, target } = parseArgs(process.argv);
  const result = calculateExercises(dailyExerciseHours, target);
  console.log(result);
} catch (error: unknown) {
  // here we can not use error.message
  if (error instanceof Error) {
    console.log("Error:", error.message);
  } else {
    console.log(error);
  }
}
