function validateEmail(input) {
  const ef =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (input.match(ef)) {
    console.log("email: " + input + " is valid!");
    return true;
  } else {
    console.log("email: " + input + " is invalid");
    return false;
  }
}

module.exports = { validateEmail };
