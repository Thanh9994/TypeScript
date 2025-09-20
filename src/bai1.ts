function sumNumbers(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sumNumbers(1, 2, 3, 4, 5));
console.log(sumNumbers(10, 20, 30));