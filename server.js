const app = require('./app');
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is lisening to port ${PORT}...`);
});
