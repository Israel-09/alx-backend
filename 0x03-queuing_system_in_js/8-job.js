function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) throw new Error('Jobs is not an array');

  jobs.forEach(data => {
    const job = queue.create('push_notification_code_3', data);

    // Listen for job completion event
    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    // Listen for job progress event
    job.on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });

    // Listen for job error event
    job.on('error', (err) => {
      console.error(`Notification job ${job.id} failed: ${err}`);
    });

    // Save the job
    job.save((err) => {
      if (err) {
        console.log('Error:', err);
        return; // Exit early if there's an error
      }
      console.log(`Notification job created: ${job.id}`);
    });
  });
}

module.exports = createPushNotificationsJobs;
