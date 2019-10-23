import Api from "./Api";
import * as Api2 from "./Api2";

class Api3 {
    mul(a: number, b: number): number {
        return a * b;
    }
}

const api = new Api();
const api2 = new Api2.Api2();
const api3 = new Api3();
console.log("call Api.add(2, 3) = " + api.add(2, 3));
console.log("call Api2.sub(2, 3) = " + api2.sub(2, 3));
console.log("call Api3.mul(2, 3) = " + api3.mul(2, 3));
