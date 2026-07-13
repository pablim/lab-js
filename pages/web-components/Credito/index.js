import defineElement from '../componentHelper.js'

defineElement({
    name: "j-credito",
    templateId: "credito_template",
    templateFile: (new URL('.', import.meta.url)).pathname + "template.html",
    init: function () {
        
    },
    props: {
        nome: {bind:"nome"},
        valor: {bind:"valor"},
        credito: {bind:"parc-atual"},
        maxInstallment: {bind:"parc-total"},
        dataVencimento: function (component, propertyValue) {
            template = component.shadowRoot
            var diaSemanaVenc = template.querySelector('.dia-semana-venc')
            var dataExtensoVenc = template.querySelector('.data-extenso-venc')
            var data = new Date(propertyValue + " 00:00:00")
            var mes = data.getMonth()
            var dia = data.getDate()
            var ano = data.getFullYear()
            
            var diaSemana = week[data.getDay()].D.pt_br
            var dataExtenso = dia + " " + months[mes].M.pt_br + " " + ano

            diaSemanaVenc.innerHTML = diaSemana.toUpperCase()
            dataExtensoVenc.innerHTML = dataExtenso.toUpperCase()
        },
        dataCredito: function (component, propertyValue) {
            template = component.shadowRoot
            var diaSemanaVenc = template.querySelector('.dia-semana-pag')
            var dataExtensoVenc = template.querySelector('.data-extenso-pag')
            var data = new Date(propertyValue + " 00:00:00")
            var mes = data.getMonth()
            var dia = data.getDate()
            var ano = data.getFullYear()
            var diaSemana = data.getDay()
            
            var diaSemana = week[diaSemana].D.pt_br
            var dataExtenso = dia + " " + months[mes].M.pt_br + " " + ano

            diaSemanaVenc.innerHTML = diaSemana.toUpperCase()
            dataExtensoVenc.innerHTML = dataExtenso.toUpperCase()

            var creditoContainer = template.querySelector("#parcela_container")
            $(creditoContainer).addClass("parcela-paga")
            $(creditoContainer).removeClass("parcela-aberta")
        
        }        
    },
    templateBinds: {
        pagar_btn: {
            onclick: function (e) {
                var codigo = this.getAttribute("codigo")
                verificaCreditoPago(codigo)
            }
        },
        editar_btn: {
            onclick: function (e) {
                var codigo = this.getAttribute("codigo")
                ajaxRequest('credito/form_modal', {'credito':codigo}, null, 
                    modalFormCredito);
            }
        },
        ver_btn: {
            onclick: function (e) {
                var codigo = this.getAttribute("codigo")
                ajaxRequest('credito/show2', {'credito':codigo}, null, 
                    verDespesaModal)
            }
        },
        remover_btn: {
            onclick: function (e) {
                debugger
                var codigo = this.getAttribute("codigo")
                openModalShadow(excluir_credito_modal)
                excluir_credito_modal.dataset.idRenda=codigo
            }
        }
        
    },
    methods: {
        teste: function () {
            console.log('teste')
        }
    }
})