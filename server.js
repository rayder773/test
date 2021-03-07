const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const axios = require('axios');

const port = 4000;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(checkRequest);

app.options('*', cors());

app.get('/getUserData', getUserData);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

function checkRequest(req, res, next) {
  const { isWaiting } = req.cookies;

  if(isWaiting) {
    res.send('Need to wait 500 mc');
  } else {
    res.cookie('isWaiting', true, { maxAge: 2000, httpOnly: true });
    next();
  }
}

async function getUserData(req, res) {
  const {data} = await axios.get('https://api.github.com/users/rayder773');

  res.json(data);
}