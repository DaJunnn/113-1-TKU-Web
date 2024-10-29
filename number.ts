function checkNumber(num: number): string {
    return num % 2 === 0 ? "even" : "odd";
}

for (let i = 1; i <= 10; i++) {
    const result = checkNumber(i);
    console.log(`Number ${i} is ${result}`);
}

console.log("\nAnother version using array methods:");

const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
numbers.forEach((num) => {
    console.log(`Number ${num} is ${checkNumber(num)}`);
});
