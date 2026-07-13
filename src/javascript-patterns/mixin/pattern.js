/**
 * Um mixin é um objeto que pode ser usado para adicionar funcionalidade 
 * reutilizável a outro objeto ou classe, sem usar herança. Não podemos usar 
 * mixins sozinhos, seu único propósito é adicionar alguma funcionalidade.
 * 
 * https://www.patterns.dev/vanilla/mixin-pattern
 */

class Dog {
    constructor(name) {
        this.name = name;
    }
}

// mixin
/**
 * Embora possamos adicionar funcionalidades com mixins sem herança, os próprios 
 * mixins podem usar herança!
 */
const animalFunctionality = {
    walk: () => console.log("Walking!"),
    sleep: () => console.log("Sleeping!"),
};

// mixin
const dogFunctionality = {
    bark: () => console.log("Woof!"),
    wagTail: () => console.log("Wagging my tail!"),
    play: () => console.log("Playing!"),
    walk() { super.walk(); },
    sleep() { super.sleep(); },
};

/**
 * We can add the dogFunctionality mixin to the Dog prototype with the 
 * Object.assign method. This method lets us add properties to the target 
 * object: Dog.prototype in this case. Each new instance of Dog will have access 
 * to the the properties of dogFunctionality, as they’re added to the Dog’s 
 * prototype!
 */
Object.assign(dogFunctionality, animalFunctionality);
Object.assign(Dog.prototype, dogFunctionality);

const pet1 = new Dog("Daisy");

console.log(pet1.name); // Daisy
pet1.bark();
pet1.play();
pet1.walk();
pet1.sleep();
