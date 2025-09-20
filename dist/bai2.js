"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dayso(str, char) {
    return str.split(char).length - 1; // cắt chuỗi thành mảng dùng char làm phân cách
}
console.log("số lần xuất hiện", dayso("hello world", "o")); // o xuất hiện trong hello world 2 lần 
console.log("số lần xuất hiện", dayso("hello world", "l")); // l xuất hiện 3 lần 
