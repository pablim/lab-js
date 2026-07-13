import defineElement from '../componentHelper.js'

defineElement({
    name: "jls-year-paginate",
    templateId: "paginacao_ano_template",
    templateFile: "PaginacaoAno/PaginacaoAno.html",
    init: function () {
        
    },
    props: {
        ano: function (component, propertyValue) {
            let prev = component.getElement(".prev")
            prev.addEventListener('click', function () {
                ajaxRequestHTML('/pages/despesa/calendario', 
                    {'ano':parseInt(propertyValue)-1}, 
                    null, 
                    replaceMainContent
                )
            })

            let next = component.getElement(".next")
            next.addEventListener('click', function () {
                ajaxRequestHTML('/pages/despesa/calendario', 
                    {'ano':parseInt(propertyValue)+1}, 
                    null, 
                    replaceMainContent
                )
            })

            let year = component.getElement(".year")
            year.innerHTML = propertyValue
        }
        
    },
    templateBinds: {
        ok_btn: { 
            onclick: function (e) {
                this.getElement("#modal").style.display='none'
            }
        },
        //newText2: "meu texto"
    },
    methods: {
        teste: function () {
            console.log('teste')
        }
    }
})