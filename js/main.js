// função assincrona para recuperar os dados sobre o jogo em formato JSON e armazenar na variável "library".

let library 

function getData(url) {
    fetch(url)
        .then(res => res.json())
        .then(json => library = json)
}

getData('https://api.hearthstonejson.com/v1/28329/ptBR/cards.collectible.json')

// função 

function adicionar1(classe) {
    let lista
    if (classe == "ALL"){
        lista = cardsHTML1(library.filter(e => e.type != "HERO"));
    } else {
        lista = cardsHTML1(library.filter(e => e.cardClass == classe && e.type != "HERO"));
    }
    document.getElementById("cards").innerHTML = lista;
    document.querySelector('.heroes').parentNode.removeChild(document.querySelector('.heroes'))
}

// Cria a estrutura HTML das cartas para exibir na página principal

function cardsHTML1(vetorObjetos){
    let previa = vetorObjetos
    let result = ''
    for(let card of previa) {
        result += `    <div class="card" id="${card.id}">
        <img onclick="moreinfo('${card.id}')" onmouseover="show('${card.id}')" onmouseout="none('${card.id}')" src="https://art.hearthstonejson.com/v1/render/latest/ptBR/256x/${card.id}.png">
        <div class="shadow" style="display:none">
            <p>Clique e veja mais informações antes de adiconar ao seu deck.</p>
        </div>
    </div>\n`
    }
    return result
}

function show(ID){
    document.getElementById(ID).children[1].setAttribute('style', 'display:grid')
}

function none(ID){
    document.getElementById(ID).children[1].setAttribute('style', 'display:none')
}

// função para gerar tela com mais informações sobre as cartas (ativada ao clicar sobre a imagem)

function moreinfo(ID){
    let carta = library.filter(e => e.id == ID)
    let info = `<div class="moreinfo">
    <div>
        <i onclick="hiden()" class="fa fa-times-circle"></i>
        <img src="https://art.hearthstonejson.com/v1/render/latest/ptBR/256x/${carta[0].id}.png">
        <div class="details">
            <h2>${carta[0].name}</h2>
            <p>Artista: ${carta[0].artist}</p>
            <p>Classe: ${translate[carta[0].cardClass]}</p>
            <p>Custo: ${carta[0].cost}</p>
            <p>Raridade: ${translate[carta[0].rarity]}</p>
            <p>Coleção: ${translate[carta[0].set]}</p>
            <p>Texto: ${carta[0].text}</p>
            <p>Tipo: ${translate[carta[0].type]}</p>
            <p>Vida: ${carta[0].health}</p>
            <div onclick="addDeck('${carta[0].id}')" class="addDeck"></div>
        </div>
    </div>
</div>`
    document.querySelector('body').insertAdjacentHTML('afterBegin', info)
}

// função aplicada ao botão X no canto da tela de moreinfo para remover a tela do HTML

function hiden(){
    document.querySelector('.moreinfo').parentNode.removeChild(document.querySelector('.moreinfo'))
}


function artInsert(classe){
    let result = `<section class="art art_${classe.toLowerCase()}">${translate[classe]}</section>`
    return result
}

function adicionar(classe) {
    adicionar1(classe)
    document.getElementById("cards").insertAdjacentHTML('beforeBegin', artInsert(classe))
}

// Cria a estrutura HTML de cada carta adicionada ao Deck

function cardsHTML2(vetorObjetos){
    let result = ''
    for(let card of vetorObjetos) {
        result += `        <div class="row-card">
        <div><p class="mana num-deck">${card.cost}</p></div>
        <div class="img"><p class="text-card">${card.name}</p><img src="https://art.hearthstonejson.com/v1/tiles/${card.id}.png"></div>
        <div><p class="quant num-deck ${card.rarity}">2</p></div>
    </div>
`
    }
    return result
}

// função para criar os elementos da página inicial

function filtros(){
    let classe = heroes
    let result = ''
    for (let e of classe){
        result += `            <div class="hero" onclick="adicionar('${e}')" style="background-image: url(img/heroes/heroes-${e.toLowerCase()}.png);">
            </div>` 
    }
    result += `            <div class="hero" onclick="adicionar('ALL')" style="background-image: url(img/heroes/heroes-all.png);background-position:center">
            </div>` 
    return result
}

const herois = document.querySelector('.heroes')
herois.insertAdjacentHTML('afterbegin', filtros())