import * as lib from './lib.mjs'
import * as deck from './deck.mjs'
import * as data from './data.mjs'

// elementos do HTML para pesquisa

const tipos = document.querySelector('#type')
const expansoes = document.querySelector('#set')
const geral = document.querySelector('#pesquisaTudo')

// criar elementos da página inicial

lib.heroes()

// filtro geral

function filtraTudo(){
    let cardsFiltrados = Array.from(document.querySelectorAll('.card'))

    let regex1 = new RegExp(geral.value,'gmi')
    let regex2
    if(tipos.value != 'ALL'){
        regex2 = new RegExp(tipos.value,'gmi')
    } else {
        regex2 = new RegExp('','gmi')
    }
    let regex3
    if(expansoes.value != 'ALL'){
        regex3 = new RegExp(expansoes.value,'gmi')
    } else {
        regex3 = new RegExp('','gmi')
    }
    let regex4
    let manas = Array.from(document.querySelectorAll('input[type=checkbox]'))
    let stringue = ''
    for(let i of manas){
        i.addEventListener('change', () => {
            filtraTudo()
        })
        if(i.checked){
            stringue += i.value
        }
    }
    if(stringue != ''){
        regex4 = new RegExp('['+stringue.split('').join('|')+']','gmi')
    } else {
        regex4 = new RegExp('','gmi')
    }
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
