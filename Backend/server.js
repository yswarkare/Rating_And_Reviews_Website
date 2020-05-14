const http = require("http");
const app = require("./app");


let server = http.createServer(app);

const port = process.env.PORT || 3000


server.listen(port, function(){
    console.log(`Connection is Ready on port ${port}`);
});