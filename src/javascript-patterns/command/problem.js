class OrderManager {
    constructor() { this.orders = [] }
	
	placeOrder(order, id) {
		this.orders.push(id)
		console.log(`You have successfully ordered ${order} (${id})`);
	}

	trackOrder(id) { 
		console.log(`Your order ${id} will arrive in 20 minutes.`);
	}

	cancelOrder(id) {
		this.orders = this.orders.filter(order => order.id !== id)
		console.log(`You have canceled your order ${id}`);
	}
}

const manager = new OrderManager();

manager.placeOrder("Pad Thai", "1234");
manager.trackOrder("1234");
manager.cancelOrder("1234");

/**
 * Existem desvantagem ao invocar métodos diretamente da instância do 
 * gerenciador. Podemos decidir renomear certos métodos mais tarde ou a 
 * funcionalidade dos métodos pode mudar.
 * 
 * Dizemos que ao invés de chamar o método placeOrder, nós agora o renomeamos 
 * para addOrder! Isso significa que devemos garantir não chamar 
 * o método placeOrder em mais lugar nenhum do nosso código, o que poderia ser 
 * muito trabalhoso em aplicações maiores. Ao invés disso nós poderíamos 
 * desacoplar os métodos do gerenciador e criar funções de comando separadas 
 * para cada comando!
 */