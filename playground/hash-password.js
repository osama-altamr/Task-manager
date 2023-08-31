const bcrypt = require("bcryptjs");

const myFunc = async () => {
  const password = "osama3032001";
  const hashedPassword = await bcrypt.hash(password, 8); // 8 -  balance between security and speed

  const isMatch= await bcrypt.compare(password,hashedPassword)

  console.log(hashedPassword);
  console.log(isMatch); 
};
myFunc();

// osama3032001 ->$2a$08$DaqC0juWPlFIBd9gwmHY4efepZu0ogca4U0ouXDs17zsp5REPnfJu ->osama3032001
