const http = require("http");
const app = require("./backend/app");
let port = process.env.PORT || 3000;

app.set("port", port);
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`🎵 API listening on localhost: ${port} 🎵`);
});
