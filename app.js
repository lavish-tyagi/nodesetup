var express = require("express");
const appRouter = express.Router();
var https = require("https");
var app = express();
var cors = require("cors");
var fs = require("fs");
var Schedule = require('node-schedule');
const errorHandler =require('./middleware/error');
const routes =require('./routes');

app.set("view engine", "ejs");
app.all(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:5000",
  );
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //* will allow from all cross domain
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

var SampleRoutes = require("./routes/Sample");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.get("/test", function (req, res) {
  res
    .status(200)
    .send(`${req.protocol}://${req.get("host")}!`);
});


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api',SampleRoutes);
// app.use(errorHandler.notFound);
// app.use(errorHandler.error);

appRouter.use('/docs', swaggerUi.serve);
appRouter.get('/docs', swaggerUi.setup(swaggerDocument));

app.use("/v1/sample", SampleRoutes);
/** Server deployment **/
var port = process.env.PORT;
if (process.env.NODE_ENV === "DEV") {
  app.listen(port, function () {
    console.log(`App listening on port ${port} in dev mode.`);
  });
 } else {
  https
    .createServer(
      {
        key: fs.readFileSync("file.key", "utf8"),
        cert: fs.readFileSync("certificate.crt", "utf8"),
        requestCert: false,
        rejectUnauthorized: false
      },
      app
    )
    .listen(port, function () {
      console.log(
        `App listening on port ${port} in prod mode`
      );
    });
}
