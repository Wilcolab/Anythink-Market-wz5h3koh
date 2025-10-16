module.exports = function (app) {
  const arithmetic = require('./controller');
  app.route('/arithmetic').get(arithmetic.calculate);
  app.route('/history').get(arithmetic.getHistory);
  app.route('/history').delete(arithmetic.clearHistory);
};
