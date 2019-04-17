const app = require('./lib/app.js');

app.listen(process.env.PORT || 3355, () => {
  console.log('server connected');
});
