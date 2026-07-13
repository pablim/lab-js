import defineElement from '../componentHelper.js'

defineElement({
    name: "my-search-bar-alphabetic",
    templateId: "my-search-bar-alphabetic",
    templateFile: (new URL('.', import.meta.url)).pathname + "template.html",
    init: function (component) {
        
        // const template = this;
        // let lista = document.getElementById(component.attributes.lista.value);
        // let letters = component.shadowRoot.querySelectorAll('.char')
        // lista.style.scrollBehavior= 'smooth'
        
        // letters.forEach(function(element, index) {
        //     console.log(element)
        //     element.addEventListener("click", function(event) {
        //         let e = lista.querySelector("."+this.dataset.letter)
        //         if (e) e.scrollIntoView(); 
        //     })
        // }) 
    },
    props: {
        nome: {bind:"nome"},
        valor: {bind:"valor"},
        credito: {bind:"parc-atual"},
        maxInstallment: {bind:"parc-total"},
        dataVencimento: function (component, propertyValue) {
           
        },
            
    },
    templateBinds: {
        
    },
    methods: {
        teste: function () {
            console.log('teste')
        }
    }
})