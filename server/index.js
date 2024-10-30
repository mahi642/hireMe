const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config(); // Load environment variables from .env;
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers");
const swaggerDocs = require("./swagger/swagger");
const app = express();


app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions)); // Use CORS middlewarae

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();


swaggerDocs(app, process.env.PORT || 4000);



app.use(require("./routes/auth"));



const userRoutes = require("./routes/user");
const companyRoutes = require("./routes/company");
const adminToutes = require("./routes/admin");
// const testRoutes = require("./routes/test");

app.use("/api/user",userRoutes);
app.use("/api/company",companyRoutes);
app.use("/api/admin",adminToutes);
// app.use("/api",testRoutes);

mongoose
  .connect(
    "mongodb://localhost:27017/hireme",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } // Use the URI from the .env file
  )
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`listening to port ${process.env.PORT || 4000}`);
    });
    console.log("Mongodb connected");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Basic route for testing
app.get("/", (req, res) => {

  res.send("Hello, HireMe Backend!");
});








