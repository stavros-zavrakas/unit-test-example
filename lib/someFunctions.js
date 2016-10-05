function someFunction1() {
  console.log('someFunction1 called')
  someFunction2();
}

function someFunction2() {
  console.log('someFunction2 called')
}

module.exports = {
  someFunction1: someFunction1,
  someFunction2: someFunction2
}
