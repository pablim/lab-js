/**
 * O padrão command permite descoplar objetos que executam uma determinada 
 * tarefa do objeto que chama aquele método.
 * 
 * https://www.patterns.dev/vanilla/command-pattern
 */

class OrderManager {
    constructor() { this.orders = []; }

    /**
     * Cada comando deve ter acesso a orders do gerenciador, o qual nós iremos 
     * passar como primeir argumento
     */
    execute(command, ...args) {
      return command.execute(this.orders, ...args);
    }
}

class Command {
    constructor(execute) { this.execute = execute; }
}
  
function PlaceOrderCommand(order, id) {
    return new Command((orders) => {
        orders.push(id);
        console.log(`You have successfully ordered ${order} (${id})`);
    });
}

function CancelOrderCommand(id) {
    return new Command((orders) => {
        orders = orders.filter((order) => order.id !== id);
        console.log(`You have canceled your order ${id}`);
    });
}

function TrackOrderCommand(id) {
    return new Command(() => 
        console.log(`Your order ${id} will arrive in 20 minutes.`));
}

const manager = new OrderManager();

manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));

/**
 * Isso permite mais controle se você está lidando com comandos que tem um certo 
 * tempo de vida, ou comandos que devem ser enfileirados e executados em 
 * momentos específicos
 * 
 * Os casos de uso para o padrão command são bastante limitados e, muitas 
 * vezes, adicionam clichês desnecessários a um aplicativo.
 */