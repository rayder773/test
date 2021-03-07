const express = require('express');
const app = express();
const cors = require('cors');
const rateLimit = require("express-rate-limit");

const port = 4000;

const corsOptions = {
  origin: 'http://localhost:3000',
};

const limiter = rateLimit({
  windowMs: 500,
  max: 2,
  onLimitReached: limitReached,
});

app.use(limiter);
app.use(cors(corsOptions));
app.options('*', cors());

app.get('/getUserData', limiter, getUserData);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

function limitReached (req, res) {
  console.warn({ ip: req.ip }, 'Rate limiter triggered')
}

async function getUserData(req, res) {
  return res.json({
    user: 'Denys'
  })
}