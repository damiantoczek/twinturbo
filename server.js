const tt = require("./index.js");

tt.listen(8080, err => {
  if(err) console.log(err);
  else console.log("Server is listening");
})
