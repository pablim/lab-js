/**
 * O padrão mediator/middleware permite componentes interagir uns com os outros
 * através de um ponto central, o mediador. Ao invés de diretamente conversar 
 * uns com os outros, o mediador recebe as requisições, e as redireciona. Em 
 * Javascript, o mediador frequentemente nada mais é que um objeto literal ou 
 * uma função.
 * 
 * Em um chat por exemplo, os usuários não iram conversar diretamente. Ao invés 
 * disso o chatroom serve como mediador entre os usuários.
 * 
 * https://www.patterns.dev/vanilla/mediator-pattern
 */

class ChatRoom {
    logMessage(user, message) {
      const time = new Date();
      const sender = user.getName();
  
      console.log(`${time} [${sender}]: ${message}`);
    }
}
  
class User {
    constructor(name, chatroom) {
      this.name = name;
      this.chatroom = chatroom;
    }
  
    getName() {
      return this.name;
    }
  
    send(message) {
      this.chatroom.logMessage(this, message);
    }
}

const chatroom = new ChatRoom();

const user1 = new User("John Doe", chatroom);
const user2 = new User("Jane Doe", chatroom);

user1.send("Hi there!");
user2.send("Hey!");