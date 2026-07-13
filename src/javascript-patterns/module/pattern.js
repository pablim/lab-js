import myDefaultFunction, { add as sum } from "./module.mjs"; 
//import * as md from "./module.mjs"; 

const add = (number) => { return 5 + number }

myDefaultFunction()
console.log(sum(3, 4))

// console.log(md.default());
// console.log(md.add(3, 4));

console.log(add(4))

// Import dinâmico
import("./module.mjs").then(module => console.log(module.add(10, 3)));

// Or with async/await
(async () => {
    const module = await import("./module.mjs");
    module.default();
    console.log(module.add(50, 70));
    
})();