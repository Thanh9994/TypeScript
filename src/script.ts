// let name: string = "Alice";
// let age: number = 30;
// console.log(`Name: ${name}, Age: ${age}`);

console.log("Variables:");
// Tam giác
let a: number = 400;
let b: number = 350;
let c: number = 200;
let d = a + b + c;
console.log("Chu vi tam giác:", d);

// Chu vi hình chữ nhật
let L: number = 20;
let R: number = 30;
let P = (L + R) * 2;
console.log("Chu vi hình chữ nhật:", P);

// Diện tích hình tròn
let r: number = 10;
let S = Math.PI * r * r;
console.log("Diện tích hình tròn:", S);


console.log("Functions:");

function add(x: number, y: number): number {
    return (x + y) * 2;
}

let result = add(5, 10);
console.log("Chu vi hình chữ nhật:", result);

function end(a: number, b: number, c: number): number {
    return a + b + c;
}
let d1 = end(400, 350, 200);
console.log("Chu vi tam giác:", d1);

function area(r: number): number {
    return Math.PI * r * r;
}
let s1 = area(10);
console.log("Diện tích hình tròn:", s1);


