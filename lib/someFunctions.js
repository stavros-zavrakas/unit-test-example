function someFunction1() {
  someFunction2();
}

function someFunction2() {

}

module.exports = {
  someFunction1: someFunction1,
  someFunction2: someFunction2
};
