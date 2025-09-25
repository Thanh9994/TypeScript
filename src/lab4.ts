interface product {
    id: number;
    name: string;
    price: number;
    category: string;
}

const products: product[] = [
    { id: 1, name: "Iphone 12", price: 1000, category: "Electronics" },
    { id: 2, name: "Samsung S21", price: 900, category: "Electronics" },
    { id: 3, name: "Dell XPS 13", price: 1200, category: "Computers" },
    { id: 4, name: "MacBook Pro", price: 1500, category: "Computers" },
    { id: 5, name: "Sony WH-1000XM4", price: 350, category: "Accessories" },
];

function filterProductsByCategory(products: product[], category: string): product[] {
    return products.filter(product => product.category === category);
}

function caculateTotalPrice(products: product[]): number {
    return products.reduce((total, product) => total + product.price, 0);
}

function findMInMaxPrice(products: product[]): { min: number; max: number } {
    const prices = products.map(product => product.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
}

console.log("Products thuộc dạng đồ điện tử:", filterProductsByCategory(products, "Electronics"));
console.log("Products thuộc dạng máy tính:", filterProductsByCategory(products, "Computers"));
console.log("Tổng giá sản phẩm:", caculateTotalPrice(products));
console.log("Giá sản phẩm thấp nhất và cao nhất:", findMInMaxPrice(products));


console.log("--------------------------------------------------");

interface Vehicles {
    id: number;
    name: string;
    type: string;
    speed: number;
}

interface MotorizedVehicle extends Vehicles {
    fuelType: fuelType;
}

enum fuelType {
    patrol = "xăng",
    diesel = "Dầu"
}

function calculateTravelTime(vehicles: Vehicles, distance: number): number {
    return distance / vehicles.speed
}

const vehicles: MotorizedVehicle[] = [
    { id: 1, name: "Car A", type: "Car", speed: 100, fuelType: fuelType.patrol },
    { id: 2, name: "Truck B", type: "Truck", speed: 80, fuelType: fuelType.diesel },
    { id: 3, name: "Motorcycle C", type: "Motorcycle", speed: 120, fuelType: fuelType.patrol },
];
console.log("Car A trong 200km:", calculateTravelTime(vehicles[0], 200), "giờ");
console.log("Truck B trong 200km:", calculateTravelTime(vehicles[1], 200), "giờ");
console.log("Motorcycle C trong 200km:", calculateTravelTime(vehicles[2], 200), "giờ");


const distance = 100;
vehicles.forEach(v => {
  console.log(
    `Thời gian di chuyển của ${v.name} trong ${distance}km:`,
    calculateTravelTime(v, distance).toFixed(2), // làm tròn 2 số thập phân
    "giờ"
  );
});

console.log("--------------------------------------------------");