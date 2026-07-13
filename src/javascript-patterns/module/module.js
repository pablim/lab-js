
// valor privado, somente visivel nesse módulo, caso não seja exportado.
const myConstant = 7;

export default function myDefaultFunction() {
    console.log('default exported function');
}

export const add = (number1, number2) => {
    return number1 + number2
}