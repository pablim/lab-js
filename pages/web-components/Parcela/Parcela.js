import defineElement from '../componentHelper.js'

defineElement({
    name: "parcela-item",
    templateId: "parcela",
    templateFile: "Parcela/Parcela.html",
    init: function (component) {
        let parcelaContainer = null
        let pagarBtn = null
        let editarBtn = null
        let removerBtn = null
        let verBtn = null

        let despesa = JSON.parse(component.get('despesa'))
        let parcela = JSON.parse(component.get('parcela'))
        let diaSemanaVenc = component.get('dia-semana-venc')
        let dataExtensoVenc = component.get('data-extenso-venc')
        let diaSemanaPag = component.get('dia-semana-pag')
        let dataExtensoPag = component.get('data-extenso-pag')
        let maxInstallment = component.get('max-installment')
        let formaPagamento = component.get('forma-pagamento')

        component.setInnerElement("#nome_despesa", despesa.nome)
        component.setInnerElement(".estabelecimento", despesa.estabelecimento)
        component.setInnerElement(".parc-atual", parcela.parcela)
        component.setInnerElement(".valor", parcela.valor)
        component.setInnerElement(".dia-semana-venc", diaSemanaVenc)
        component.setInnerElement(".data-extenso-venc", dataExtensoVenc)
        component.setInnerElement(".parc-total", maxInstallment)
        component.setInnerElement(".forma-pagamento", formaPagamento)

        if (parcela.data_pagamento) {
            component.setInnerElement(".dia-semana-pag", diaSemanaPag)
            component.setInnerElement(".data-extenso-pag", dataExtensoPag)

            parcelaContainer = component.getElement("#parcela_container")
            $(parcelaContainer).addClass("parcela-paga")
            $(parcelaContainer).removeClass("parcela-aberta")
        }

        parcelaContainer = component.getElement("#parcela_container")
        pagarBtn = component.getElement(".pagar-btn")
        editarBtn = component.getElement(".editar-btn")
        verBtn = component.getElement(".ver-btn")
        removerBtn = component.getElement(".remover-btn")
        
        pagarBtn.onclick = function () {
            verificaParcelaPaga(parcela.codigo)
        }

        editarBtn.onclick = function () {
            ajaxRequestHTML('parcela/edit3', {'parcela':parcela.codigo}, null, 
                modalForm)
        }

        verBtn.onclick = function () {
            ajaxRequestHTML('parcela/show2', {'parcela':parcela.codigo}, null, 
                verDespesaModal)
        }

        removerBtn.onclick = function () {
            openModalShadow(excluir_parcela_modal)
            excluir_parcela_modal.dataset.idParcela=parcela.codigo
        }
    },
    props: {
        dataExtensoPag: function (component, contentProp) {
            if (contentProp != "" && contentProp != null) {
                component.setInnerElement(".data-extenso-pag", contentProp)

                let parcelaContainer = component.getElement("#parcela_container")
                $(parcelaContainer).addClass("parcela-paga")
                $(parcelaContainer).removeClass("parcela-aberta")
            }
        },
        diaSemanaPag: function (component, contentProp) {
            if (contentProp != "" && contentProp != null) {
                component.setInnerElement(".dia-semana-pag", contentProp)
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