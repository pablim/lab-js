import defineElement from '../componentHelper.js'

defineElement({
    name: "jls-card-value",
    templateId: "card_value_template",
    templateFile: (new URL('.', import.meta.url)).pathname + "template.html",
    init: function (component) {},
    props: {
        label: function (component, contentProp) {
            component.setInnerElement(".label", contentProp)
        },
        value: function (component, contentProp) {
            component.setInnerElement(".value", contentProp)
        }, 
        valueClass:  function (component, contentProp) {
            let element = component.getElement(".value-container")
            $(element).addClass(contentProp)
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