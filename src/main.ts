// let myAge: number = 30;

// let myName: string = "Thành";

// let isStudent: boolean = true;

// let hobbies: string[] = ["Reading", "Traveling", "Gaming"];

// let scores: number[] = [85, 90, 78];

// interface Person {
//     id: number;
//     name: string;
//     age: number;
//     address: string;
//     isStudent: boolean;
// }
//  let person: Person = {
//     id: 1,
//     name: "Thành",
//     age: 30,
//     address: "Hà Nội",
//     isStudent: true
// };


//2*

function sumNumbers(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sumNumbers(1, 2, 3, 4, 5));
console.log(sumNumbers(10, 20, 30));

//3*

function dayso(str: string, char: string): number {
    return str.split(char).length - 1; // cắt chuỗi thành mảng dùng char làm phân cách
}
console.log("số lần xuất hiện",dayso("hello world", "o")); // o xuất hiện trong hello world 2 lần 

console.log("số lần xuất hiện",dayso("hello world", "l")); // l xuất hiện 3 lần 

//4*

function isPrime(num: number): boolean { 
    if (num < 2 ) return false; //số < 2 không phải là số nguyên tố
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0 ) return false;
    }
    return true;
}

console.log("5 là số nguyên tố?", isPrime(5)); //true, vì chỉa cho 1 và 5
console.log("10 là số nguyên tố?", isPrime(10)); //false, vì chia cho 2 và 5 
