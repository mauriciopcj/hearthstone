// função para pesquisar quais classe existem no jogo

function classes(allCards){
    let tipos = []
    for (let e of allCards) {
        if (tipos.includes(e.cardClass) == 0 && e.cardClass !== 'NEUTRAL') {
            tipos.push(e.cardClass)
        }
    }
    return tipos.sort()
}

