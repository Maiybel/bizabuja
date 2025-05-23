const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const businessRoutes = require("./routes/businessRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", businessRoutes);

app.get("/", (req, res) => {
  res.send("Abuja Businesses API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
