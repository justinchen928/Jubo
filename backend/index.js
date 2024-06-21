const express = require("express");
const swaggerDocs = require("./utils/swagger");
const morgan = require("morgan");
const cors = require("cors");
const patientRoute = require("./routes/patient.route");
const orderRoute = require("./routes/order.route");

const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

const initialPatients = [
  { name: "小民" },
  { name: "小柏" },
  { name: "小蘭" },
  { name: "小姐" },
  { name: "小妹" },
];

const db = require("./models");
db.sequelize
  .sync() // sync the database
  .then(async () => {
    console.log("Synced db.");

    const patientCount = await db.Patients.count();
    if (patientCount === 0) {
      await db.Patients.bulkCreate(initialPatients);
      console.log("Inserted initial patients.");
    }
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/patients", patientRoute);
app.use("/orders", orderRoute);

const port = process.env.PORT || 4000;

app.listen(port, async () => {
  console.log(`Backend running on port ${port}`);
  swaggerDocs(app, port);
});
