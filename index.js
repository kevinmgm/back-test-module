'use strict';
const express = require('express');
const limiter = require('req-rate-limit');

var app = express();
const port = 3000;

const limit = limiter({
  timeReset: 60 * 1000,
  activateLockTimeRequest: true, // Allow lock requests that is doing a number attemps define on attempsRequests
  attempsRequests: 5,
  showLogsIpLock: true,
  showLogsAllIpLocks: false,
  returnIpLock: false,
  returnAllIpLocks: false,
});

app.set('trust proxy', true);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(limit);

app.get('/', (req, res) => {
  // res.send('Hello World! ', req.reqRateLimit);
  return res.status(200).json(req.reqRateLimit);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
