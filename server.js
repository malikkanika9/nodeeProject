const express = require("express");
const cors = require("cors");
const routee = require("./routes/route")
const app = express();
require("./configuration/dbConfig.js")
app.use(express.json());
app.use(cors({ origin:true, credentials:true }));
const PORT = process.env.PORT || 3001;

app.use("/",routee)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

