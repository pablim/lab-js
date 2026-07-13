/**
 * Web Workers são mecanismos que permitem que uma operação de um dado script 
 * seja executado em uma thread diferente da thread principal da aplicação Web. 
 * Permitindo que cálculos laboriosos sejam processados sem que ocorra bloqueio 
 * da thread principal (geralmente associado à interface).
 */

var i = 0;

function timedCount() {
    i = i + 1;

    // is used to post a message back to the HTML page.
    postMessage(i);

    setTimeout("timedCount()",1000);
}

timedCount(); 

/**
 * Web Workers and the DOM
 * Since web workers are in external files, they do not have access to the following JavaScript objects:
 *      The window object
 *      The document object
 *      The parent object
*/

// https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Workers_API
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers
// https://www.w3schools.com/html/html5_webworkers.asp