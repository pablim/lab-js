const mirrorCode = (fromId, toId) => {
    const fromElement = document.getElementById(fromId)
    const toElement = document.getElementById(toId)
    toElement.innerHTML = fromElement.innerHTML
}

const mirrorCodeHTML = (fromId, toId) => {
    const fromElement = document.getElementById(fromId)
    const toElement = document.getElementById(toId)
    toElement.textContent = fromElement.outerHTML
}

export { mirrorCode, mirrorCodeHTML }