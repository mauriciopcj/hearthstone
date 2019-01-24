// função assincrona para recuperar os dados sobre o jogo em formato JSON e armazenar na variável "library".

let library 

function getData(url) {
    fetch(url)
        .then(res => res.json())
        .then(json => library = json)
    
}

getData('https://api.hearthstonejson.com/v1/28329/ptBR/cards.collectible.json')


function a(){
    library.sort((a,b) => ordenandoJson(a,b))
}

function ordenandoJson(a,b){
    if (a.cost > b.cost){
        return 1
    }
    if (a.cost < b.cost){
        return -1
    }
    if (a.cost == b.cost){
        if (a.name > b.name){
            return 1
        }
        if (a.name < b.name){
            return -1
        }
        return 0
    }
}

// função para criar a estrutura de cartas após escolher a classe

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
        <img onclick="moreinfo('${card.id}')" src="https://art.hearthstonejson.com/v1/render/latest/ptBR/256x/${card.id}.png">
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
            <p>Ataque: ${carta[0].attack}</p>
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
    a()
    adicionar1(classe)
    document.getElementById("cards").insertAdjacentHTML('beforeBegin', artInsert(classe))
    document.getElementById("class").selectedIndex = 3
}

// função para criar os elementos da página inicial

function filtros(){
    let classe = heroes
    let result = '<div class="choise">Escolha uma classe</div>'
    for (let e of classe){
        result += `            <div class="hero" onclick="adicionar('${e}')" style="background-image: url(img/heroes/heroes-${e.toLowerCase()}.png);">
                <div class="hero_name">${translate[e]}</div>
            </div>` 
    }
    return result
}

const herois = document.querySelector('.heroes')
herois.insertAdjacentHTML('afterbegin', filtros())
