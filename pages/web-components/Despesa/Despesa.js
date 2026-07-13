import defineElement from '../componentHelper.js'

defineElement({
    name: "despesa-item",
    templateId: "despesa_template",
    templateFile: "Despesa/Despesa.html",
    init: function (component) {},
    props: {
        nome: function (component, contentProp) {
            component.setInnerElement("#nome", contentProp)
        },
        estabelecimento: function (component, contentProp) {
            component.setInnerElement("#estabelecimento", contentProp)
        },
        descricao: function (component, contentProp) {
            component.setInnerElement("#descricao", contentProp)
        },
        valor: function (component, contentProp) {
            if (contentProp != "") {
                let valorContainer = component.getElement(".valor-container")
                let valorContainerParcela = component.getElement(".parcela-numero")
                let n = component.get("parcelas")
                
                $(valorContainer).removeClass("w3-hide")
                $(valorContainerParcela).removeClass("w3-hide")

                component.setInnerElement("#valor", contentProp)
                component.setInnerElement("#numero_parcelas", n)
            }
        },
        parcelas: function (component, contentProp) {
            if (contentProp != "") {
                let valorContainer = component.getElement(".parcela-numero")
                $(valorContainer).removeClass("w3-hide")
                component.setInnerElement("#numero_parcelas", contentProp)
            }
        },
        valorParcela: function (component, contentProp) {
            debugger
            if (contentProp != "") {
                let valorContainer = component.getElement(".parcela-numero")
                $(valorContainer).removeClass("w3-hide")
                component.setInnerElement("#valor_parcela", contentProp)
            }
        }
    },
    templateBinds: {
        
    },
    methods: {
        teste: function () {
            console.log('teste')
        }
    }
})