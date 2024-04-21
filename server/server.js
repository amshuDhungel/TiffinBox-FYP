import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import postRoutes from "./routes/post.js";
import cookieParser from "cookie-parser";
import { connectDb } from "./dbConfig/db.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/", (req, res) => {
  res.send("I am a home route");
});
//routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/post", postRoutes);

//server listeners
const PORT = 8080;

connectDb();

app.listen(PORT, function () {
  console.log(`Server Port: ${PORT}`);
});
