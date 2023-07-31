const app = require("./app");

const LOCAL_PORT = 5000;

const server = app.listen(LOCAL_PORT, () => {
  console.log(`App running on ${LOCAL_PORT}`);
});
