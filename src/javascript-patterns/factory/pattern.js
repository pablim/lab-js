/**
 * Podemos usar factory functions para criar novos obejtos. A factory function
 * deve retornar um novo obejto sem o uso da palavra-chave new
 * 
 * https://www.patterns.dev/vanilla/factory-pattern
 */

const createUser = ({ firstName, lastName, email }) => ({
    firstName,
    lastName,
    email,
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
});

const user1 = createUser({
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com"
});
  
const user2 = createUser({  
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com"
});
  
console.log(user1); 
console.log(user2);

/**
 * Entretanto, em muitos casos pode ser mais eficiente em termos de memória 
 * criar novas instâncias ao invés de novos obejtos a cada vez.
 *
 * class User {
 *    constructor(firstName, lastName, email) {
 *        this.firstName = firstName;
 *        this.lastName = lastName;
 *        this.email = email;
 *    }
 *
 *    fullName() { return `${this.firstName} ${this.lastName}`; }
 * }
 */