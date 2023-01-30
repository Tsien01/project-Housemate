const { faker } = require("@faker-js/faker");

function validateEmail(input) {
    const ef =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (input.match(ef)) {
      return true;
    } else {
      return false;
    }
  }

function generateHHPassword() {
  return faker.word.adjective() + faker.word.noun();
}


module.exports = { validateEmail, generateHHPassword };