function checkNumber(num) {
    return num % 2 === 0 ? "even" : "odd";
}
for (var i = 1; i <= 10; i++) {
    var result = checkNumber(i);
    console.log("Number ".concat(i, " is ").concat(result));
}
console.log("\nAnother version using array methods:");
var numbers = Array.from({ length: 10 }, function (_, i) { return i + 1; });
numbers.forEach(function (num) {
    console.log("Number ".concat(num, " is ").concat(checkNumber(num)));
});
