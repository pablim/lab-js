/**
 * https://www.patterns.dev/vanilla/observer-pattern
 */

class Observable {
    constructor() { this.observers = []; }
  
    subscribe(func) { this.observers.push(func); }
  
    unsubscribe(func) {
        this.observers = this.observers.filter((observer) => observer !== func);
    }
  
    notify(data) {
        this.observers.forEach((observer) => observer(data));
    }
}

function logger(data) {
    console.log(`logging ${Date.now()} ${data}`);
}
  
function toastify(data) {
    console.log(`toasting ${data}`);
}

const observer = new Observable()

observer.subscribe(logger)
observer.subscribe(toastify)

observer.notify("usuário executou")