export const calculateBmi = (heightInCentimeters: number, mass: number): string => {
  if (isNaN(heightInCentimeters) || isNaN(mass)) {
    throw new Error("Provided values were not numbers!");
  }

  var heightInMeters = heightInCentimeters / 100;
  const bmi = mass / Math.pow(heightInMeters, 2);
  const bmiPrime = bmi / 25.0;
  const bmiPrimeRounded = Math.round(bmiPrime * 100) / 100;

  if (bmiPrimeRounded < 0.64) return "Underweight (Severe thinness)";
  else if (bmiPrimeRounded < 0.68) return "Underweight (Moderate thinness)";
  else if (bmiPrimeRounded < 0.74) return "Underweight (Mild thinness)";
  else if (bmiPrimeRounded < 1.0) return "Normal range";
  else if (bmiPrimeRounded < 1.2) return "Overweight (Pre-obese)";
  else if (bmiPrimeRounded < 1.4) return "Obese (Class II)";
  else return "Obese (Class III)";
};

interface BmiCalculatorArgs {
  heightInCentimeters: number;
  mass: number;
}

export const parseArgs = (args: Array<string>): BmiCalculatorArgs => {
  if (args.length !== 4) {
    throw new Error("Usage: <heightInCentimeters> <mass>");
  }

  const heightInCentimeters = Number(args[2]);
  const mass = Number(args[3]);

  return {
    heightInCentimeters: heightInCentimeters,
    mass: mass,
  };
};

try {
  const { heightInCentimeters, mass } = parseArgs(process.argv);
  const calculateBmiResult = calculateBmi(heightInCentimeters, mass);
  console.log(calculateBmiResult);
} catch (error: unknown) {
  // here we can not use error.message
  if (error instanceof Error) {
    console.log("Error", error.message);
  } else {
    console.log(error);
  }
}
