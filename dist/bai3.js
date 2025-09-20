"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPrime(num) {
    if (num < 2)
        return false; //số < 2 không phải là số nguyên tố
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0)
            return false;
    }
    return true;
}
console.log("5 là số nguyên tố?", isPrime(5)); //true, vì chỉa cho 1 và 5
console.log("10 là số nguyên tố?", isPrime(10)); //false, vì chia cho 2 và 5 
