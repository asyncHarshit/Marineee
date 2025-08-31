import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import geminiRoute from "./routes/flash.routes.js"
import citizenRoutes from "./routes/citizens.routes.js";
import communityRoutes from "./routes/community.routes.js";
import newsRoutes from "./routes/serp.route.js"
import videoCall from "./routes/videoCall.Routes.js"
import notificationRoutes from "./routes/notification.route.js"
import smsRoutes from "./routes/sendSMS.route.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/citizen", citizenRoutes)
app.use("/api/gemini", geminiRoute);
app.use("/api/citizen", citizenRoutes)
app.use("/api/community", communityRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/call", videoCall);
app.use("/api/notification", notificationRoutes);
app.use("/api/sms", smsRoutes);

import validatePostWithGemini  from "./routes/validation.controller.js";

app.post("/api/community/validate-post", validatePostWithGemini);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => 
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error(err));
