// função para exibir e ocultar o deck clicando no botao "baralho"

button_baralho.addEventListener('click', function exibirDeck(){
    let posicao = deck.style.top
    if(posicao == "-500px"){
        deck.setAttribute('style','top:101px;')
    } else {
        deck.setAttribute('style','top:-500px;')
    }
})

// função para exibir e ocultar o filtro de pesquisa clicando no botao "pesquisa"

button_pesquisa.addEventListener('click', function exibirpesquisa(){
    let visibilidade = search.style.display
    if(visibilidade == "none"){
        search.setAttribute('style','display:grid;')
    } else {
        search.setAttribute('style','display:none;')
    }
})

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
