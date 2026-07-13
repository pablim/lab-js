/**
 * O padrão prototype é uma maneira útil de compartilhar propriedades entre 
 * muitos objetos do mesmo tipo. O prototype é um objeto nativo do JavaScript e 
 * pode ser acessado por objetos por meio da cadeia de prototype.
 * 
 * Como a cadeia de protótipos nos permite acessar propriedades que não são 
 * definidas diretamente no próprio objeto, podemos evitar a duplicação de 
 * métodos e propriedades, reduzindo assim a quantidade de memória usada.
 * 
 * https://www.patterns.dev/vanilla/prototype-pattern
 */

class Dog {
    /**
     * O construtor contém uma propriedade name, e a classe em si contém uma 
     * propriedade bark. Ao usar classes ES6, todas as propriedades que são 
     * definidas na classe em si, bark neste caso, são automaticamente 
     * adicionadas ao protótipo.
     */
    constructor(name) { this.name = name; }
  
    bark() { return `Woof!`; }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");

console.log(Dog.prototype);
console.log(dog1.__proto__);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

Dog.prototype.play = () => console.log("Playing now!");

dog1.play();

/**
 * Object.create é uma maneira simples de deixar objetos herdarem propriedades 
 * diretamente de outros objetos, especificando o protótipo do objeto 
 * recém-criado. O novo objeto pode acessar as novas propriedades percorrendo a 
 * cadeia de protótipos.
 */
const dog3 = Object.create(dog1)
console.log(dog3.bark());
