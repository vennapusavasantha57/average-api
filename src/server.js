
const express = require("express");

const app = express();

// Accept JSON objects and primitive values, including numbers.
app.use(express.json({ strict: false }));

let sum = 0;
let count = 0;

/**
 * Resets the running average state.
 * Used to isolate automated tests.
 */
function resetAverage() {
  sum = 0;
  count = 0;
}

/**
 * Adds a number and returns the running average.
 *
 * @route POST /average
 * @param {number|{number: number}} req.body
 *        A raw JSON number or an object containing a number.
 * @returns {{average: number, count: number}}
 *          The running average and number of valid inputs.
 * @returns {{error: string}} 400 - Invalid input or malformed JSON.
 */
app.post("/average", (req, res) => {
  const number =
    typeof req.body === "number"
      ? req.body
      : req.body?.number;

  if (typeof number !== "number" || !Number.isFinite(number)) {
    return res.status(400).json({
      error: "Please provide a valid number."
    });
  }

  sum += number;
  count += 1;

  return res.status(200).json({
    average: sum / count,
    count
  });
});

// Handle malformed JSON with a 400 response.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON."
    });
  }

  return next(err);
});

const PORT = process.env.PORT || 3000;

// Start the server only when this file is run directly.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = { app, resetAverage };
