const pet = {
  name: "Osama",
};

pet.toJSON = function () {
  console.log(this);
  return {}; // empty so the JSON.stringify empty
};
console.log(JSON.stringify(pet));

// express when we pass an object to res.send()
// express its calling json.stringify() behind the scenes
//
