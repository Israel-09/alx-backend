import { expect } from "chai";

import createPushNotificationsJobs from './8-job.js';

const kue = require('kue');

const queue = kue.createQueue();
before(function() {
  queue.testMode.enter();
});

afterEach(function() {
  queue.testMode.clear();
});

after(function() {
  queue.testMode.exit()
});


describe('test for creating notifications', () => {
  it('should fail if job is not a list', () => {
    const job = {
      phoneNumber: '090909',
      message: 'Get ready for the action.'
    }
    expect(() => createPushNotificationsJobs(job, queue)).to.throw('Jobs is not an array');
  });

  it ('should increase queue if job is successfully created', () => {
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
    expect(queue.testMode.jobs.length).to.equal(2);
  });
  it('should handle job completion event', (done) => {
    const job = {
      phoneNumber: '4154318781',
      message: 'This is the code 4562 to verify your account'
    };
    queue.testMode.clear(); // Clear any existing jobs
    createPushNotificationsJobs([job], queue);
    queue.testMode.jobs[0].emit('complete');
    setTimeout(() => {
      done();
    }, 100);
  });
  it('should not throw error for empty jobs array', () => {
    expect(() => createPushNotificationsJobs([], queue)).not.to.throw();
  });
  
});