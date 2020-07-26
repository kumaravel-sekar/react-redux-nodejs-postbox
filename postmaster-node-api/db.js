const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/postMasterDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("Mongoose connection succeeded.");
    else
      console.log(
        "Error while connecting MongoDB :" + JSON.stringify(err, undefined, 2)
      );
  }
);
