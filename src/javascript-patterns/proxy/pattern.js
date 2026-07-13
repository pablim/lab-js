/**
 * Um Proxy permite obter mais controle sobre as interações com certos 
 * objetos. Um objeto proxy pode determinar o comportamento sempre que 
 * estivermos interagindo com outro objeto, por exemplo, quando estivermos 
 * obtendo um valor ou definindo um valor.
 * 
 * Em termos gerais, um proxy significa um substituto para outra pessoa. Em vez 
 * de falar diretamente com essa pessoa, você falará com a pessoa (proxy) que 
 * representará a pessoa que você estava tentando alcançar. 
 * 
 * Proxies são uma maneira poderosa de adicionar controle sobre o comportamento 
 * de um objeto. Um proxy pode ter vários casos de uso: pode ajudar com 
 * validação, formatação, notificações ou depuração.
 * 
 * O uso excessivo do objeto Proxy ou a execução de operações pesadas em cada 
 * invocação de método do manipulador pode facilmente afetar negativamente o 
 * desempenho do seu aplicativo. É melhor não usar proxies para código crítico 
 * de desempenho.
 * 
 * https://www.patterns.dev/vanilla/proxy-pattern
 */

const person = {
    name: "John Doe",
    age: 42,
    nationality: "American",
};

const personProxy = new Proxy(person, {
    get: (obj, prop) => {
        if (!obj[prop]) {
            console.log(
                `Hmm.. this property doesn't seem to exist on the target object`
            );
        } else {
            console.log(`The value of ${prop} is ${obj[prop]}`);
            /**
             * O JavaScript fornece um objeto interno chamado Reflect, que 
             * facilita a manipulação do objeto de destino ao trabalhar com 
             * proxies.
             * 
             * Em vez de acessar propriedades por meio de obj[prop] ou definir 
             * propriedades por meio de obj[prop] = value, podemos acessar ou 
             * modificar propriedades no objeto de destino por meio de 
             * Reflect.get() e Reflect.set(). Os métodos recebem os mesmos 
             * argumentos que os métodos no objeto handler.
             */
            //Reflect.get(obj, prop)
        }
    },
    set: (obj, prop, value) => {
        if (prop === "age" && typeof value !== "number") {
            console.log(`Sorry, you can only pass numeric values for age.`);
        } else if (prop === "name" && value.length < 2) {
            console.log(`You need to provide a valid name.`);
        } else {
            console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
            obj[prop] = value;
            //Reflect.set(obj, prop, value);
        }
    },
});
/**
 * Um proxy pode ser útil para adicionar validação. Um usuário não deve ser 
 * capaz de alterar a idade de uma pessoa para um valor de string ou dar a ela 
 * um nome vazio. Ou se o usuário estiver tentando acessar uma propriedade no 
 * objeto que não existe, devemos informá-lo.
 */

personProxy.name;
personProxy.age = 43;
personProxy.nonExistentProperty;