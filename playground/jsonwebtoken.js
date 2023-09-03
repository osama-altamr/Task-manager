const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "abcd123" }, "osamaaltamrahmedali", {
    expiresIn: "0 seconds",
    // expiresIn: "5 days",
  });
  console.log(token);
  //   head.body. last
  //  64 .64 .
  //   . _id.verify the token

  const data = jwt.verify(token, "osamaaltamrahmedali");
  console.log(data);
};

myFunction();
