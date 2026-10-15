
const express = require("express");

const app = express();
app.use(express.json());

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
 * Accepts a number and returns the average of all
 * valid numbers submitted since the server started.
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
  count++;

  return res.json({
    average: sum / count,
    count
  });
});

// Return a clear error for malformed JSON.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON." });
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
