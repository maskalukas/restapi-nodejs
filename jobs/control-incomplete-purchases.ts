const cron = require("node-cron");

const task = cron.schedule('0 0 0 * * *', () => {
});

module.exports = task;