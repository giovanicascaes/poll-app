const { hooks } = require("@adonisjs/ignitor");

hooks.before.httpServer(() => {
  const Validator = use("Adonis/Addons/Validator");

  Validator.extend("time", (data, field, message, _args, get) => {
    return new Promise((resolve, reject) => {
      const value = get(data, field);

      if (value) {
        const scheduleRegex = /(\d?\d):(\d{2})/g;
        const schedule = scheduleRegex.exec(value);
        if (schedule === null || schedule.length !== 3) {
          reject(message);
        } else {
          const [, hour, minute] = schedule;
          if (isNaN(hour) || isNaN(minute)) {
            reject(message);
          } else {
            if (parseInt(hour) > 23 || parseInt(minute) > 59) {
              reject(message);
            } else {
              resolve();
            }
          }
        }
      } else {
        resolve();
      }
    });
  });
});
