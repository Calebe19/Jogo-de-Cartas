const simbolos = ["🍎", "🐶", "🚀", "⚽", "🌟", "🎵", "🐱", "🍕"];

let jogadorAtual = 1;
let pontos = {1:0, 2:0};
let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let paresEncontrados = 0;

const tabuleiro = document.getElementById("tabuleiro");
const mensagemVez = document.getElementById("mensagem-vez");
const resultado = document.getElementById("resultado");
const botaoReiniciar = document.getElementById("btn-reiniciar");

function embaralhar(lista){
    for(let i = lista.lenght - 1; i>0;i--){
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i]]
    }
}