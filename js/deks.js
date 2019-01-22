let druida = []
let cacador = []
let mago = []
let paladino = []
let sarcedote = []
let ladino = []
let xama = []
let bruxo = []
let guerreiro = []

function addDeck(ID){
    let lista = cardsHTML2(library.filter(e => e.id == ID))
    document.querySelector('#deck').insertAdjacentHTML('beforeEnd', lista)
}

function exibirdeck(){
    let baralho = document.querySelector('#deck').style.display
    if(baralho == "none"){
        document.querySelector('#deck').setAttribute('style','display:grid;')
    } else {
        document.querySelector('#deck').setAttribute('style','display:none;')
    }
}

function exibirpesquisa(){
    let pesquisa = document.querySelector('#pesquisa').style.display
    if(pesquisa == "none"){
        document.querySelector('#pesquisa').setAttribute('style','display:grid;')
    } else {
        document.querySelector('#pesquisa').setAttribute('style','display:none;')
    }
}