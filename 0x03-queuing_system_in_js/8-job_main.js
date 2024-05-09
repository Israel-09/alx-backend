import kue from 'kue';

import createPushNotificationsJobs from './8-job.js';

const queue = kue.createQueue();
const jobs = [
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
]
createPushNotificationsJobs(jobs, queue);