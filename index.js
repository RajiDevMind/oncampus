const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const connectDB = require("./db/connect");
const errorHandler = require("./errors/error");
const { createCustomError } = require("./errors/custom-error");
const app = express();

// middlewares
app.use(express.static("./public"));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

app.use(errorHandler);
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/oncampus", userRoutes);

const start = () => {
  app.listen(port, async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      console.log(`Server is running at http://localhost:${port}`);
    } catch (error) {
      if (
        error.hostname === "_mongodb._tcp.oncampuscluster.05kfe2z.mongodb.net"
      ) {
        console.log("Unable to connect! check ur internet connection");
        return createCustomError(
          "Unable to connect! check ur internet connection"
        );
      } else {
        console.log("Unexpected error", error);
        return createCustomError("Unexpected error", error);
      }
    }
  });
};

start();
