let deckConstructor = []
let manaCurve
let poArcano

// Cria a estrutura HTML de cada carta adicionada ao Deck

function cardsHTML2(vetorObjetos){
    let result = ''
    for(let card of vetorObjetos) {
        result += `        <div class="row-card" onclick="removeDeck('${card[1]}')">
        <div><p class="mana num-deck">${card[0]}</p></div>
        <div class="img"><p class="text-card">${card[2]}</p><img src="https://art.hearthstonejson.com/v1/tiles/${card[1]}.png"></div>
        <div><p class="quant num-deck ${card[3]}">${card[4]}</p></div>
    </div>
`
    }
    return result
}

function removeDeck(ID){
    for (i in deckConstructor){
        if (deckConstructor[i][1] == ID && deckConstructor[i][4] == 2){
            deckConstructor[i][4] -= 1
            total -= 1
            calcCurve()
            po()
        } else {
            if (deckConstructor[i][1] == ID && deckConstructor[i][4] == 1) {
                deckConstructor.splice(i,1)
                total -= 1
                calcCurve()
                po()
            }
        }
    }
    document.querySelector('.deckCards').innerHTML = cardsHTML2(deckConstructor)
    document.querySelector('#totalCards').innerHTML = `${total}/30`
    document.querySelector('#totalArcane').innerHTML = `${poArcano}<img src="img/dust.png">`
}

// 

function atualizaManaCurve(array){
    for (i in array){
        if (Math.max(...array) == 0) {
            document.querySelector(`#curva_${i} div`).style.height = `0%`
        } else {
            document.querySelector(`#curva_${i} div`).style.height = `${(array[i]*100/Math.max(...array))}%`
        }
        document.querySelector(`#quant_${i}`).innerHTML = `${array[i]}`
    }
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
    atualizaManaCurve(manaCurve)
}

// quantidade de pó arcano com as cartas adicionadas ao deck

const poConverte = {
    "FREE" : "0",
    "COMMON" : "50",
    "RARE" : "100",
    "EPIC" : "400",
    "LEGENDARY" : "1600"
}

function po(){
    let result = 0
    for (i of deckConstructor){
        result += poConverte[i[3]] * i[4]
    }
    poArcano = result
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
                    po()
                }
            }
        } else {
            deckConstructor.push([lista[0].cost,lista[0].id,lista[0].name,lista[0].rarity,1])
            total += 1
            calcCurve()
            po()
        }
        deckConstructor.sort((a, b) => ordenandoDeck(a,b))
        document.querySelector('.deckCards').innerHTML = cardsHTML2(deckConstructor)
        document.querySelector('#totalCards').innerHTML = `${total}/30`
        document.querySelector('#totalArcane').innerHTML = `${poArcano}<img src="img/dust.png">`
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
    let baralho = document.querySelector('#deck').style.top
    if(baralho == "-500px"){
        document.querySelector('#deck').setAttribute('style','top:101px;')
    } else {
        document.querySelector('#deck').setAttribute('style','top:-500px;')
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
