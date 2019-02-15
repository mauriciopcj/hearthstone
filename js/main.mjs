import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import '../node_modules/popper.js/dist/umd/popper.min.js'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/jquery/dist/jquery.slim.min.js'
import * as lib from './lib.mjs'
import * as data from './data.mjs'
import '../css/master.css'
import '../css/deck.css'
import '../css/cards.css'



// elementos do HTML para pesquisa

const tipos = document.querySelector('#type')
const expansoes = document.querySelector('#set')
const geral = document.querySelector('#pesquisaTudo')

// criar elementos da página inicial

lib.heroes()

// filtro geral

function filtraTudo(){
    let cardsFiltrados = Array.from(document.querySelectorAll('.card'))

    // cria regExp 1 para caixa de texto
    let regex1 = new RegExp(geral.value,'gmi')

    // cria regExp 2 para tipo de carta selecionada
    let regex2
    if(tipos.value != 'ALL'){
        regex2 = new RegExp(tipos.value,'gmi')
    } else {
        regex2 = new RegExp('','gmi')
    }

    // cria regExp 3 para a expansão selecionada
    let regex3
    if(expansoes.value != 'ALL'){
        regex3 = new RegExp(expansoes.value,'gmi')
    } else {
        regex3 = new RegExp('','gmi')
    }

    // cria regExp 4 para o custo da mana
    let regex4
    let manas = Array.from(document.querySelectorAll('input[type=checkbox]'))
    let stringue = ''
    for(let i of manas){
        if(i.checked){
            stringue += i.value
        }
    }
    if(stringue != ''){
        if(stringue.includes('7')){
            stringue += '89'
        }
        regex4 = new RegExp('['+stringue.split('').join('|')+']','gmi')
    } else {
        regex4 = new RegExp('','gmi')
    }

    // utiliza as RegExp criadas para exibir as cartas de acordo com o filtro
    for(let i of cardsFiltrados){
        let objeto
        for (let j of lib.library) {
            if (i.id == j.id){
                objeto = j
            }
        }
        if ( ( regex1.test(objeto.name) || regex1.test(objeto.text) || regex1.test(data.translate[objeto.rarity]) || regex1.test(data.translate[objeto.race]) ) && ( regex2.test(objeto.type) ) && ( regex3.test(objeto.set) ) && ( regex4.test(objeto.cost) ) ){
            i.style.display = 'flex'
        } else {
            i.style.display = 'none'
        }
    }
}

// evento na caixa de texto
geral.addEventListener('keyup', (event) => {
    event.preventDefault()
    filtraTudo()
})

// evento no select tipos
tipos.addEventListener("change", function() {
    filtraTudo()
});

// evento no select expansões
expansoes.addEventListener("change", function() {
    filtraTudo()
});

// evento no checkbox das manas
let observa = Array.from(document.querySelectorAll('input[type=checkbox]'))

for(let i of observa){
    i.addEventListener('change', () => {
        filtraTudo()
    })
}

// função para exibir o baralho e a pesquisa
function showHidden(um, dois){
    if(document.querySelector(um).className.includes('show')){
        $(um).collapse('toggle')
        $(dois).collapse('toggle')
    } else {
        $(dois).collapse('toggle')
    }
}

// evento no botao pesquisar
lib.botaoPesquisa.addEventListener('click', (event) => {
    event.preventDefault()
    showHidden('#deck','#pesquisa')
})

// evento no botao baralho
lib.botaoBaralho.addEventListener('click', (event) => {
    event.preventDefault()
    showHidden('#pesquisa','#deck') 
})
