const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

//connect to MongoDB
mongoose.connect('mongodb+srv://pritesh:LpS1mXXMPoBlCLYw@cluster0.4tf0p6z.mongodb.net/courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
