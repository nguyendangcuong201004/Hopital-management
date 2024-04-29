const express = require("express");
const dotenv = require("dotenv");
const systemConfig = require("./config/system.js");
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const database = require("./config/database.js");

const routeClient = require("./routes/client/index.route.js");


dotenv.config();
const app = express();



app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`))
app.use(methodOverride('_method'))

app.use(cookieParser('NDCNDTN'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.errors = req.flash("error");
    res.locals.successes = req.flash("success");
    next();
  });

app.use(bodyParser.urlencoded({ extended: false }));

database.connect();

app.locals.prefixAdmin = systemConfig;

const port = process.env.PORT;

routeClient(app);

app.listen(port, () => {
    console.log(`Chay tren cong ${port}`);
})
