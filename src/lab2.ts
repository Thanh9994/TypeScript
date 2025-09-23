// let number1: number = 5;
// let number2: number = 10;
// let permit: boolean = true;
// let phrase: string = "Kết quả của phép cộng là: ";
// const result: number = number1 + number2;
// if(permit){
//     console.log(phrase + result);
// }else{
//     console.log("Bạn không có quyền xem kết quả");
// }

// function add(x = 5){
//     let phrase = "Kết quả của phép cộng là: ";
//     phrase = 10;
//     x = '2,8';

//     return phrase + x;
// }

// let result: number = add();

// var person: {
//     name: string,
//     age: number,
// }
// person = {
//     name: "Nguyễn Văn A",
//     age: 30,
// }

// console.log(person.name);

// enum role {ADMIN, READ_ONLY, AUTHOR};
// const person1 : {
//     name: string,
//     age: number,
//     hobbies: string[],
//     role: string,
//     rolesetup: [number, string],
// } ={
//     name: "Nguyễn Văn A",
//     age: 30,
//     hobbies: ["Thể thao", "Du lịch"],
//     role: role.ADMIN, //ERORR
//     rolesetup: [2, "author"],
// }

// let favoriteActivities: any[];
// favoriteActivities = ["Du lịch", 1, true];
// if(person1.role === role.ADMIN){//ERORR
//     console.log("is admin");
// }

// person1.rolesetup.push("hello");
// person1.rolesetup[1] = 10;//ERORR
// person1.rolesetup = [0, "hello"];


// type Combinable = number | string;
// function combine(input1: Combinable, input2: Combinable){
//     let result;
//     if(typeof input1 === 'number' && typeof input2 === 'number'){
//         result = input1 + input2;
//     }else{
//         result = input1.toString() + input2.toString();
//     }
//     return result;
// }
// console.log(combine(1, 5));
// console.log(combine("Hello", " TypeScript"));
// console.log(combine("Hello", 5));
// console.log(combine(1, " TypeScript"));


// var a = null;
// console.log(a);
// console.log(typeof a);

// var b;
// console.log(b);
// console.log(typeof b);
// console.log(undefined === b);


// let useIput : unknown;
// let userName : string;

// useIput = 5;
// useIput = "type script";
// userName = useIput as string;
// userName = <string>useIput;
// if(typeof useIput === 'string'){
//     userName = useIput;
// }