import * as data from './data.mjs'
import * as deck from './deck.mjs'
import * as main from './main.mjs'

// alguns elementos do HTML selecionados

const botaoPesquisa = document.querySelector('#buttonSearch')
const botaoBaralho = document.querySelector('#buttonDeck')

// funções para ordenar o JSON

function comparando(a,b){
    if (a.cost > b.cost){ return 1 }
    if (a.cost < b.cost){ return -1}
    if (a.cost == b.cost){
        if (a.name > b.name){ return 1 }
        if (a.name < b.name){ return -1}
        return 0
    }
}

// função assincrona para retornar o JSON e armazenar em library

let library

fetch('https://api.hearthstonejson.com/v1/28329/ptBR/cards.collectible.json')
    .then(res => res.json())
    .then(json => {
        library = json
        library = library.sort((a,b) => comparando(a,b))
    })

// função para criar os elementos da página inicial

function heroes(){
    let classe = data.heroes
    let result = '<div class="choise">Escolha uma classe</div>'
    document.querySelector('.heroes').insertAdjacentHTML('beforeend', result)
    for (let e of classe){
        result = `            <div class="hero" data-name="${e}" style="background-image: url(img/heroes/heroes-${e.toLowerCase()}.png);">
                <div class="hero_name">${data.translate[e]}</div>
            </div>`
            document.querySelector('.heroes').insertAdjacentHTML('beforeend', result)
            document.querySelector('.heroes').lastChild.addEventListener('click', () => {
                adicionar(e)
            })
    }
    return result
}

// Cria a estrutura HTML das cartas para exibir na página principal

function cardsHTML(vetorObjetos){
    let previa = vetorObjetos
    let result = ''
    for(let card of previa) {
        result += `    <div class="card" id="${card.id}">
        <img src="https://art.hearthstonejson.com/v1/render/latest/ptBR/256x/${card.id}.png">
    </div>\n`
    }
    return result
}

// OK
// arte com o nome de classe na página de cards

function artInsert(classe){
    let result = `<section class="art art_${classe.toLowerCase()}">${data.translate[classe]}</section>`
    return result
}
// OK
// função para criar a estrutura de cartas após escolher a classe

function addCards(classe) {
    let lista
    if (classe == "ALL"){
        lista = cardsHTML(library.filter(e => e.type != "HERO"));
    } else {
        lista = cardsHTML(library.filter(e => e.cardClass == classe && e.type != "HERO"));
    }
    document.getElementById("cards").innerHTML = lista
    let cardList = Array.from(document.querySelectorAll('.card'))
    for (let i of cardList){
        i.addEventListener('click', () => {
            deck.addDeck(i.id)
        })
    }
    document.querySelector('.heroes').parentNode.removeChild(document.querySelector('.heroes'))
}

// função para estruturas os elementos na pagina de acordo com a classe

function adicionar(classe) {
    botaoBaralho.setAttribute('style', 'display:show;')
    botaoPesquisa.setAttribute('style', 'display:show;')
    addCards(classe) // criar as cartas
    document.getElementById("cards").insertAdjacentHTML('beforeBegin', artInsert(classe)) // insere uma arte especifica da classe no título da página
    document.getElementById("cards").insertAdjacentHTML('beforeBegin', '<div class="toUp"><i class="fas fa-chevron-up"></i></div>')
    navTop = document.querySelector('.toUp')
    loadNavTop()
}

// função para mostrar botão para subir ao todo da página

let navTop

function loadNavTop() {
    navTop.addEventListener('click', () => {
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
            left: 0
        })
    })
  
    document.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 1/3) {
            navTop.style = 'display:flex'
        } else {
            navTop.style = 'display:none'
        }
    })
}

export { heroes, library, botaoPesquisa, botaoBaralho }