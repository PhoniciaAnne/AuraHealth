const cron = require('node-cron');

cron.schedule('0 9 * * *', () => {
    console.log("Sending daily health tip to users...");
});
