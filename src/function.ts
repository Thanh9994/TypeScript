function sum(): number {
    let a = 10, b = 20, c = 30;
    return a + b + c;
};

const sumArray = (): number => {
    let a = 10, b = 20, c = 30;
    return a + b + c;
};

console.log("Function: ", sum());
console.log("Function Arrow: ", sumArray(), ".");

const sumDefault = (a: number, b: number = 0): number => a + b;

const sumOptional = (a: number, b?: number): number => a + (b ?? 0);

const sumRest = (...numbers: number[]): number => {
    return numbers.reduce((total,num) => total + num, 0);
};

console.log("Function Default: ", sumDefault(10));
console.log("Function Default: ", sumDefault(10, 20));
console.log("Function Optional: ", sumOptional(10));
console.log("Function Optional: ", sumOptional(10, 20));
console.log("Function Rest: ", sumRest(10, 20, 30, 40, 50));


const hobbies = ["Thể thao", "Du lịch"];
const activeHobbies = ["Ăn uống"];

activeHobbies.push(hobbies as any);
console.log("Sau khi push nguyên mảng:", activeHobbies);

const mergedHobbies = [...hobbies, ...activeHobbies];
console.log("Sau khi merge mảng:", mergedHobbies);

activeHobbies.push(...hobbies);
console.log("Sau khi push từng phần tử:", activeHobbies);

const sothich = ["Thể thao", "Du lịch"];
const activeSothich = ["Ăn uống"];
const mergedSothich = [...sothich, ...activeSothich];
console.log("Sau khi merge mảng sothich:", mergedSothich);


let sum = (x: number = 5, y?: number): number => {return x + <number>y;};
let speech = (output: any): void =>{
    console.log("result: ", output);
}
speech(sum(10, 20));
console.log("result: ", sum(10, 20));