const kue = require('kue');


const data = {
  phoneNumber: "0808767767",
  message: "stay-safe",
}

const push_notification_code = kue.createQueue();

const job = push_notification_code.createJob('notification', data)
  .save(err => {
    if (err) console.log("Notification job failed");
    console.log('Notification job created:', job.id);
  });

job.on('complete', () => {console.log('Notification job completed')});
