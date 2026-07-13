const masonryItems = () => {
    const cards = document.querySelectorAll("main > div")
    cards.forEach((item, idx) => {
        if (idx+3 < cards.length) {
    
            const cardAdj = cards[idx + 3]
            const itemOffsetHeight = item.offsetHeight
            const itemOffsetTop = item.offsetTop
    
            const offsetTop = cardAdj.offsetTop
            
            const top = offsetTop - (itemOffsetHeight + itemOffsetTop) - 8 - 16
    
            cardAdj.style.position = "relative"
            cardAdj.style.top = `${top*(-1)}px`
        }
    })
}

export { masonryItems }

