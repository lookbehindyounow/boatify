const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router.js");
const createOrderRouter = require("./helpers/create_order_router.js");

MongoClient.connect("mongodb://127.0.0.1:27017", { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("boatify");
    const locationsCollection = db.collection("locations");
    const locationsRouter = createRouter(locationsCollection);
    app.use("/api/locations", locationsRouter);
    const extrasCollection = db.collection("extras");
    const extrasRouter = createRouter(extrasCollection);
    app.use("/api/extras", extrasRouter);
    const ordersCollection = db.collection("orders");
    const ordersRouter = createOrderRouter(ordersCollection);
    app.use("/api/orders", ordersRouter);
  })
  .catch(console.err);

app.listen(7777, function () {
  console.log(`Listening on port ${this.address().port}`);
});
