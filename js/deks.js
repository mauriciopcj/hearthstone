let deckConstructor = []

// Cria a estrutura HTML de cada carta adicionada ao Deck

function cardsHTML2(vetorObjetos){
    let result = ''
    for(let card of vetorObjetos) {
        result += `        <div class="row-card">
        <div><p class="mana num-deck">${card[0]}</p></div>
        <div class="img"><p class="text-card">${card[2]}</p><img src="https://art.hearthstonejson.com/v1/tiles/${card[1]}.png"></div>
        <div><p class="quant num-deck ${card[3]}">${card[4]}</p></div>
    </div>
`
    }
    return result
}

// função que adiciona o card ao deck quando clicado na imagem das cartas

let total = 0

function addDeck(ID){
    let lista = library.filter(e => e.id == ID)
    // falta a condição de estar completo o deck
    if (total < 30){
        if (existe(ID)){
            for (i of deckConstructor){
                if (i[1] == ID){
                    if(i[4] == 1){
                        if(i[3] != "LEGENDARY"){
                            i[4] = 2
                            total += 1
                        }
                    }
                }
            }
        } else {
            deckConstructor.push([lista[0].cost,lista[0].id,lista[0].name,lista[0].rarity,1])
            total += 1
        }
        deckConstructor.sort((a, b) => ordenandoDeck(a,b))
        document.querySelector('#deck').innerHTML = cardsHTML2(deckConstructor)
        document.querySelector('#deck').insertAdjacentHTML("beforeend", total)
    }
}

function ordenandoDeck(a,b){
    if (a[0] > b[0]){
        return 1
    }
    if (a[0] < b[0]){
        return -1
    }
    if (a[0] == b[0]){
        if (a[2] > b[2]){
            return 1
        }
        if (a[2] < b[2]){
            return -1
        }
        return 0
    }
}

function existe(ID){
    if (deckConstructor == []){
        return false
    }
    for (i of deckConstructor){
        if (i[1] == ID){
            return true
        }
    }
    return false
}

// função para exibir e ocultar o deck clicando no botao "baralho"

function exibirdeck(){
    let baralho = document.querySelector('#deck').style.display
    if(baralho == "none"){
        document.querySelector('#deck').setAttribute('style','display:grid;')
    } else {
        document.querySelector('#deck').setAttribute('style','display:none;')
    }
}

// função para exibir e ocultar o filtro de pesquisa clicando no botao "pesquisa"

function exibirpesquisa(){
    let pesquisa = document.querySelector('#pesquisa').style.display
    if(pesquisa == "none"){
        document.querySelector('#pesquisa').setAttribute('style','display:grid;')
    } else {
        document.querySelector('#pesquisa').setAttribute('style','display:none;')
    }
}
