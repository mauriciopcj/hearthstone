let deckConstructor = []
let manaCurve 

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

// adicionar a quantidade de cards por custo de mana

function calcCurve(){
    manaCurve = [0,0,0,0,0,0,0,0]
    for (i of deckConstructor){
        if (i[0] == 0) { manaCurve[0] += i[4] }
        if (i[0] == 1) { manaCurve[1] += i[4] }
        if (i[0] == 2) { manaCurve[2] += i[4] }
        if (i[0] == 3) { manaCurve[3] += i[4] }
        if (i[0] == 4) { manaCurve[4] += i[4] }
        if (i[0] == 5) { manaCurve[5] += i[4] }
        if (i[0] == 6) { manaCurve[6] += i[4] }
        if (i[0] >= 7) { manaCurve[7] += i[4] }
    }
}

// função que adiciona o card ao deck quando clicado na imagem das cartas

let total = 0

function addDeck(ID){
    let lista = library.filter(e => e.id == ID)
    if (total < 30){
        if (existe(ID)){
            for (i of deckConstructor){
                if (i[1] == ID && i[4] == 1 && i[3] != "LEGENDARY"){
                    i[4] = 2
                    total += 1
                    calcCurve()
                }
            }
        } else {
            deckConstructor.push([lista[0].cost,lista[0].id,lista[0].name,lista[0].rarity,1])
            total += 1
            calcCurve()
        }
        deckConstructor.sort((a, b) => ordenandoDeck(a,b))
        document.querySelector('#deck').innerHTML = cardsHTML2(deckConstructor)
        document.querySelector('#deck').insertAdjacentHTML("beforeend", total)
    }
}

// ordena os cards que estão no deck por custo de mana e ordem alfabética

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

// verifica se o card já está no deck, utilizado para limitar a quantidade inserida

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
