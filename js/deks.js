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

// function showDeck(classe){

// }