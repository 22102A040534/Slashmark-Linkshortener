const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Url-Shortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true)
