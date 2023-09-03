const body = {
  description: "i love it ",
};

const data = {
  owner: "osama tr",
};

var allData = {
  body,
  owner:data.owner,
};
var allDataWithSpread = {
  ...body,
  owner:data.owner,
};

console.log(allData);
console.log(allDataWithSpread);
