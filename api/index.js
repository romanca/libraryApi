import express from "express";
import sequelize from "./models/sequelize.js";
import bookRouter from "./routes/book.js";
import cors from "cors";
// import bodyParser from "body-parser";

sequelize.sync({ force: true }).then(() => console.log("db is ready"));

const app = express();
app.use(cors());
// app.use(bodyParser.json());

app.use(bookRouter);

app.listen(4000, () => {
  console.log("Server started successfully.");
});
