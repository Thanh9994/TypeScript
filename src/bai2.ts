function dayso(str: string, char: string): number {
    return str.split(char).length - 1; // cắt chuỗi thành mảng dùng char làm phân cách
}
console.log("số lần xuất hiện",dayso("hello world", "o")); // o xuất hiện trong hello world 2 lần 

console.log("số lần xuất hiện",dayso("hello world", "L")); // l xuất hiện 3 lần 


//split là một hàm có sẵn của kiểu chuỗi (string) trong JavaScript/TypeScript. 
// Nó dùng để cắt chuỗi thành một mảng con dựa trên dấu phân tách (separator) mà bạn chỉ định.

//string.split(separator, limit?)
//separator: ký tự hoặc chuỗi để cắt (ví dụ " ", "o", "," …).1

//limit (tuỳ chọn): số lượng phần tử tối đa trong mảng kết quả.