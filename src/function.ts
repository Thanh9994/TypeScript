function sumFixed(): number {
    let a = 10, b = 20, c = 30;
    return a + b + c;
};

const sumArray = (): number => {
    let a = 10, b = 20, c = 30;
    return a + b + c;
};

console.log("Function: ", sumFixed());
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


let sum = (x: number = 5, y?: number): number => {
    return x + (y ?? 0);
};
let speech = (output: any): void =>{
    console.log("result: ", output);
}
speech(sum());
speech(sum(10));
speech(sum(5, 12));

console.log("result: ", sum(10, 20));

let something: void = undefined;
// something = 1; //ERORR
// something = "hello"; //ERORR
// something = null; //ERORR
// something = {}; //ERORR
// something = []; //ERORR
let nothing: null = null;
// nothing = 1; //ERORR
// nothing = "hello"; //ERORR
// nothing = undefined; //ERORR
// nothing = {}; //ERORR
// nothing = []; //ERORR
function throwError(message: string): never {
    throw new Error(message);
}
// throwError("Something went wrong");
// console.log("after throw");
// let result = throwError("Something went wrong");
// console.log("after throw", result);

function AddandHandle(num1: number, num2: number, cb: (num: number) => void): void {
    const result = num1 + num2;
    cb(result);
}

AddandHandle(10, 20, (result) => {
    console.log("result from callback: ", result);
});