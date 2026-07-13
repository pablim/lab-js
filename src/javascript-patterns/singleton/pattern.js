/**
 * Singletons são classes que podem ser instanciadas uma vez e podem ser 
 * acessadas globalmente. Essa instância única pode ser compartilhada por todo o 
 * nosso aplicativo, o que torna os Singletons excelentes para gerenciar o 
 * estado global do aplicativo.
 * 
 * Alguns cuidados devem ser tomados ao usar o padrão singleton, no caso de 
 * atualizações acidentais e poluição do escopo global de variáveis.
 * 
 * https://www.patterns.dev/vanilla/singleton-pattern  
 */

let instance;
let counter = 0;

class Counter {
    constructor() {
        if (instance) {
          throw new Error("You can only create one instance!");
        }
        instance = this;
    }

    getInstance() { return this; }
    getCount() { return counter; }
    increment() { return ++counter; }
    decrement() { return --counter; }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;

/**
 * No entanto, a implementação de classe mostrada nos exemplos acima é realmente 
 * um exagero. Como podemos criar objetos diretamente em JavaScript, podemos 
 * simplesmente usar um objeto regular para obter exatamente o mesmo resultado. 
 * 
 * let count = 0;
 * 
 * const counter = {
 *   increment() { return ++count; },
 *   decrement() { return --count; }
 * };
 * 
 * Object.freeze(counter);
 * export { counter };
 */
