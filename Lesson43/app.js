const { performance } = require('perf_hooks');

let t0 = performance.now();
let products = {};
for (let i = 1; i <= 1000; i++) {
    products[`product${i}`] = i;
}
let t1 = performance.now();

console.log(`Time to create object: ${(t1 - t0)} milliseconds.`);

t0 = performance.now();
let price = products['product50'];
t1 = performance.now();

console.log(`Time to access 50th element: ${(t1 - t0)} milliseconds.`);