import Api from "./Api";
import * as Api2 from "./Api2";

const api = new Api();
const api2 = new Api2.Api2();
console.log("call Api.add(2, 3) = " + api.add(2, 3));
console.log("call Api2.sub(2, 3) = " + api2.sub(2, 3));

