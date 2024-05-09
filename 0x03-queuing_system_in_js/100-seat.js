const express = require('express');
const Redis = require('redis');
const { promisify } = require('util');
const kue = require('kue');

const app = express();
const port = 1245;

const redisClient = Redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

const queue = kue.createQueue();

let numberOfAvailableSeats = 50;
let reservationEnabled = true;

async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats');
  return parseInt(seats);
}

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ "status": "Reservation are blocked" });
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      return res.json({ "status": "Reservation failed" });
    }
    return res.json({ "status": "Reservation in process" });
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.error(`Seat reservation job ${job.id} failed: ${err}`);
  });
});

app.get('/process', async (req, res) => {
  console.log({ "status": "Queue processing" });

  const newNumberOfAvailableSeats = await getCurrentAvailableSeats() - 1;
  await reserveSeat(newNumberOfAvailableSeats);

  if (newNumberOfAvailableSeats === 0) {
    reservationEnabled = false;
  }

  res.json({ "status": "Queue processing" });
});

app.get('/available_seats', async (req, res) => {
  const numberOfSeats = await getCurrentAvailableSeats();
  res.json({ "numberOfAvailableSeats": numberOfSeats });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
