const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const connectDB = require("./db/connect");
const errorHandler = require("./errors/error");
const app = express();

const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandler);

// app.use(express.static("notification.html"));
app.use("/oncampus", userRoutes);

const start = () => {
  app.listen(port, async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      console.log(`Server is running at http://localhost:${port}`);
    } catch (error) {
      console.log(error);
    }
  });
};

start();
