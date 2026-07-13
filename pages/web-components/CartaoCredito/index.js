import defineElement from '../componentHelper.js'

defineElement({
    name: "cartao-credito",
    templateId: "cartao_credito",
    templateFile: (new URL('.', import.meta.url)).pathname + "template.html",
    init: function (component) {},
    props: {
        cartao: function (component, contentProp) {
            let cartao = JSON.parse(contentProp)

            component.setInnerElement("#nome_cartao_demo", cartao.nome)

            if (cartao.numero) {
                let group1 = cartao.numero.substr(0, 4)
                let group2 = cartao.numero.substr(4, 4)
                let group3 = cartao.numero.substr(8, 4)
                let group4 = cartao.numero.substr(12, 4)
                component.setInnerElement(".card-number-group-1", group1)
                component.setInnerElement(".card-number-group-2", group2)
                component.setInnerElement(".card-number-group-3", group3)
                component.setInnerElement(".card-number-group-4", group4)
            }
            component.setInnerElement("#nome_titular", cartao.nomeTitular)
            component.setInnerElement("#vencimento_demo", cartao.mesAnoVencimento)

            let bandeira = component.getElement("#bandeira")
            if (cartao.bandeira == "visa") {
                bandeira.src = "/resources/imagens/visa.png"
            } else if (cartao.bandeira == "master") {
                bandeira.src = "/resources/imagens/mastercard.png"
            } else if (cartao.bandeira == "elo") {
                bandeira.src = "/resources/imagens/elo.png"
            } else if (cartao.bandeira == "american") {
                bandeira.src = "/resources/imagens/american-express.png"
            } else if (cartao.bandeira == "hipercard") {
                bandeira.src = "/resources/imagens/hipercard.png"
            }
            
            const label = component.getElement(".label-group-cartao")
            const input = component.getElement("#cartao"+cartao.nome)

            if (label) {
                label.for = "cartao_" + cartao.nome
                label.value = cartao.codigo
            }
            if (input) input.value = cartao.codigo
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