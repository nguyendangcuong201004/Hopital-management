const express = require("express");
const dotenv = require("dotenv");
const systemConfig = require("./config/system.js");

const routeClient = require("./routes/client/index.route.js");

dotenv.config();
const app = express();


app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`))

app.locals.prefixAdmin = systemConfig;

const port = process.env.PORT;

routeClient(app);

app.listen(port, () => {
    console.log(`Chay tren cong ${port}`);
})
