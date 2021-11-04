const PORT = 4000;
const app = require('./app');

app.use(PORT, () => {
  console.log('Olá');
});
