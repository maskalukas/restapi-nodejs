export  {};
const cron = require("node-cron");
const CartsService = require("../services/carts-service");

/**
 * Cron job, který se volá každý den v 24:00.
 * Prohledává nedokončené objednávky a poté o tom informuje zákazníka.
 */
const task = cron.schedule('0 0 0 * * *', () => {
    const CartsServiceIns = new CartsService();
    CartsServiceIns.informCustomersAboutIncomplePurchase();
});

module.exports = task;