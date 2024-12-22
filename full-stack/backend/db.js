const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/ProductsDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(" Connected "))
  .catch((err) => console.error("connection error:", err));


process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
