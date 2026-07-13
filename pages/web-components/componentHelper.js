import Component from './Component.js'
import convertCase from '../../src/component-helper/convertCase.js'
export default async function defineElement (definition) {
	
	var c = () => class extends Component{
		constructor () {
			super(definition)
        }
        
        static get observedAttributes() {
            let attrNames = []
            
            for (var i in definition.props) {
                attrNames.push(convertCase(i, "camel", "kebab"))
            }
            
            return attrNames
        }
	}

    await fetch(definition.templateFile
    ).then(res => {
        if (!res.ok) { throw new Error('Erro ao carregar a página') }
        return res.text();
    })
    .then(html => {
        document.body.innerHTML = html + document.body.innerHTML
        customElements.define(definition.name, c())
    })
}